import Product from "@/models/products";
import { connectMongoDB } from '@/config/mongodb';
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const dir = path.join(process.cwd(), "public/uploads");
      try {
        await fs.mkdir(dir, { recursive: true }); // Ensure the directory exists
        cb(null, dir);
      } catch (error) {
        cb(error, null);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// Multer middleware
export const config = {
  api: {
    bodyParser: false, // Disable default body parser for handling multipart data
  },
};

export default async function handler(req, res) {
  await connectMongoDB();

  if (req.method === 'POST') {
    upload.single('image')(req, {}, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading image', error: err.message });
      }

      const { name, price, company, description, userid, quantity } = req.body;

      if (!name || !price || !company || !description || !userid) {
        return res.status(400).json({ message: 'All fields must be entered' });
      }

      const imageUrl = `/uploads/${req.file.filename}`; // Relative path to the uploaded image

      try {
        await Product.create({
          name,
          price,
          userid,
          description,
          company,
          quantity,
          imageUrl,
          isfeature:false
        });

        const products = await Product.find({userid:userid});

        return res.status(200).json({ message: 'Successfully entered', data: products });
      } catch (error) {
        return res.status(500).json({ message: 'Error saving product', error: error.message });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const products = await Product.find(); // Fetch all products
  
      // Format the products to ensure the image URL is correctly formatted
      const formattedProducts = products.map(product => ({
          ...product._doc, // Spread the product document
          image: product.imageUrl ? `${product.imageUrl}` : 'default.jpg',
      }));
  
      return res.status(200).json({ products: formattedProducts });
  } catch (error) {
      return res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
  
  
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
