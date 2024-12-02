import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 
import review from "@/models/reviews";
import User from "@/models/user";

export default async function handler(req, res) {
    // Ensure that this function only handles POST requests
    if (req.method === "POST") {
        const {productid } = req.body;

        // Connect to MongoDB
        await connectMongoDB();

        

        // Fetch reviews related to the specified user and product
        const rev = await review.find({productid: productid });

        console.log("Reviews:", rev);

        
        const user = await Promise.all(
            rev.map(async (r) => {
                const userDoc = await User.findById(r.userid); // Fetch user by ID
                return {
                    name: userDoc?.name,
                    ...r._doc,
                };
            })
        );

        console.log("User Reviews:", user);

        // Return the response with the enriched reviews
        res.status(200).json({ review: user });
    } else {
        // Handle non-POST requests
        res.status(405).json({ message: "Method not allowed" });
    }
}
