import bcrypt from "bcryptjs";
import { connectMongoDB } from '@/config/mongodb'; 
import product from "@/models/products";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        await connectMongoDB();

        const updatedProduct = await product.findByIdAndUpdate(
            id,
            { isfeature: true },
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Featured successfully" });
    }
}
