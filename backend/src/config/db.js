const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(
      "MongoDB connection error. Running in local-only mode.",
      err.message,
    );
  }
};

module.exports = connectDB;
