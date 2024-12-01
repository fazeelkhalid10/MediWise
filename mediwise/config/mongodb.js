import mongoose from "mongoose";

const uri =process.env.MONGOB_URI;


export const connectMongoDB = async () => {
  try {
 
    await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: "myDatabase" 
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
