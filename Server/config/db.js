const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Please verify:")
    console.log("- MONGODB_URI is set in .env file")
    console.log("- The URI follows format: mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname")
    console.log("- Your network allows connections to MongoDB Atlas")
    process.exit(1);
  }
};

module.exports = connectDB;
