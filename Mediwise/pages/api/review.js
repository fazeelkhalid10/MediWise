
import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 
import review from "@/models/reviews";

export default async function handler(req,res) {

    if(req.method==="POST")
        {

const {userid,productid,reviews,stars}=req.body;
console.log(req.body);

await connectMongoDB();

await review.create({


    userid,productid,reviews,stars
})
res.status(200).json({message:"Successfull!!"})

        }

    
    
}