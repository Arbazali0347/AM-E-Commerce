import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Function for strict Gmail validation
const isValidGmail = (email) => {
    // Basic Gmail regex: starts with letters/numbers, ends with @gmail.com, min length 10
    const gmailRegex = /^[a-zA-Z0-9._%+-]{5,}@gmail\.com$/;
    return gmailRegex.test(email);
}

// ____________________________________________
// Route for User Login
const loginUser = async (req, res)=>{
    try {
        const {email,password} = req.body;

        // Validate Gmail format during login
        if(!isValidGmail(email)){
            return res.json({success: false, message: "Please enter a valid Gmail address"});
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success: true, token})
        }else{
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Route for User Register
const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;

        // Validate Gmail format
        if(!isValidGmail(email)){
            return res.json({success: false, message: "Please enter a valid Gmail address"});
        }

        // Check user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User already exists"})
        }

        // Check password length
        if(password.length < 8){
            return res.json({success: false, message: "Please enter a strong password (min length 8)"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            email,
            name,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
// ________________________________________


// Route for admin Login
const adminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {loginUser, registerUser, adminLogin}
