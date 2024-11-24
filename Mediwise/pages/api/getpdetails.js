import product from "@/models/products";
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 


export default async function handler(req,res) {


  const {id}=req.body;
    await connectMongoDB();

    if(id==null)
        {
            return res.status(400).json({ message: 'All Feilds shoul be enter' });
console.log("hello");


        }

    const products = await product.findById(id);
console.log(products)
    return res.status(200).json({ data:products,message:"success" });







    }


    


    
