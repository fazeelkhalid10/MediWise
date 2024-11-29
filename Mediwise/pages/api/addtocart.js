import addtocart from "@/models/addtocar";
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 

export default async function handler(req, res) {

if(req.method==="POST")
    {
        await connectMongoDB();
const {userid,productid}=req.body;
console.log(userid,productid)
await addtocart.create(
    {

userid,productid

    })



res.status(200).json({message:"Successfull!!"});


    }

    

}