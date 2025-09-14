import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import validator from 'validator'
import jwt from "jsonwebtoken"


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// ____________________________________________
// Route for User Login
const loginUser = async (req, res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            res.json({success: false, message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success: true, token})
        }else{
            res.json({success: false, message: "invalid credentials"})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}
// Route for User Register
const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
        // Check user login exists or not
        if(exists){
            return res.json({success: false, message: "User already exists"})
        }

        // Check Email is validation or or strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please Enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message: "Please Enter the Strong Password min length 8"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            email:email,
            name:name,
            password:hashedPassword
        })
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
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
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