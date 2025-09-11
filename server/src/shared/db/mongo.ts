import mongoose from "mongoose";

// Create connection
const db = mongoose.connection;

// Listen for events
db.on("connected", () => {
  console.log("event : ✅ MongoDB connected");
});

db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://indracit:indracit@localhost:27017/exam_portal?authSource=admin", {
      dbName: "exam_portal",
      user: "indracit",
      pass: "indracit",
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;