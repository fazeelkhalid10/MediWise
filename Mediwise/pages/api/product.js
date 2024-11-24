import product from "@/models/products";
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 


export default async function handler(req,res) {

if(req.method==='POST')
    {
  const {name,price,company,description,userid}=req.body;
    await connectMongoDB();

    if(company==null||name==null||price==null||userid==null||description==null)
        {
            return res.status(400).json({ message: 'All Feilds shoul be enter' });



        }
await product.create(
    {
        name,
        price,
        userid,
        description,
        company





    })
    return res.status(200).json({ message: 'Successfully Entered' });

}
else if(req.method==='GET')
    {
        try {
            console.log("hwhh0");
            await connectMongoDB();
            const products = await product.find(); // Fetch all entries
            return res.status(200).json(products); // Return the products in the response
          } catch (error) {
            return res.status(500).json({ message: 'Error fetching products', error: error.message });
          }
        } else {
          return res.status(405).json({ message: 'Method not allowed' });
        }




    }


    


    
