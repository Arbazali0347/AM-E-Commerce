import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import connectCloudinary from "./configs/cloudinary.js"
import userRoute from "./routes/userRouter.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import bulkDealRoutes from "./routes/bulkDeal.routes.js"

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// use Middleware
app.use(express.json())
app.use(cors())

// end point 
app.use("/api/bulk-deals", bulkDealRoutes);
app.use("/api/user", userRoute)
app.use("/api/product", productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRouter)
app.get("/", (req, res)=>{
    res.send("API is working successfully!")
})

app.listen(port,()=>{console.log("Your App working is PORT " + port)})