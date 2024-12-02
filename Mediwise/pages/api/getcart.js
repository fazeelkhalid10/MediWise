import product from "@/models/products";
import addtocart from "@/models/addtocar";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/config/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userid } = req.body;

    await connectMongoDB();

    const addtocart1 = await addtocart.find({ userid: userid });

    console.log("Reviews:", addtocart1);

    const cart = await Promise.all(
      addtocart1.map(async (r) => {
        // Handle case where r.productid or findById may fail
        const p = await product.findById(r.productid);

        if (!p) {
          console.warn(`Product not found for productId: ${r.productid}`);
          return null; // Skip this item
        }

        return {
          name: p.name,
          price: p.price,
          quantity:1,
          description: p.description,
          ...r._doc, // Ensure r._doc exists
        };
      })
    );

    const filteredCart = cart.filter((item) => item !== null);

    console.log(filteredCart);
    res.status(200).json(filteredCart);
    
  }
}
