import product from "@/models/products";
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 


export default async function handler(req,res) {

if(req.method==='POST')
    {
  const {userid}=req.body;
    await connectMongoDB();

    if(userid==null)
        {
            return res.status(400).json({ message: 'All Feilds shoul be enter' });
console.log("hello");


        }

    const products = await product.find({ userid: userid });

    return res.status(200).json({ data:products,message:"success" });

}
else if(req.method==='GET')
    {
        try {
            console.log("hwhh0");
            await connectMongoDB();
            const products = await product.find({ userid: "6743127a13090386dd260903"}); // Fetch all entries
            console.log({products});
            return res.status(200).json({data:products}); // Return the products in the response
          } catch (error) {
            return res.status(500).json({ message: 'Error fetching products', error: error.message });
          }
        } else {
          return res.status(405).json({ message: 'Method not allowed' });
        }




    }


    


    
