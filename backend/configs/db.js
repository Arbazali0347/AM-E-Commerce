import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Mongodb connected successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error.message);
    // app crash na ho iske liye, process exit kar de ya retry kar
    // process.exit(1); // agar tu app ko forcefully stop karna chahta hai

    // ya sirf warning de kar app chala rehne de
  }
};

export default connectDB;
