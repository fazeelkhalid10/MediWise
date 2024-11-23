import mongoose from "mongoose";

const uri = "mongodb+srv://User:User%40123@mediwise.hkyft.mongodb.net/?retryWrites=true&w=majority&appName=mediwise";


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
