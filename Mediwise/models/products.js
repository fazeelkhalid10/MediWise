import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Use Number instead of Int32Array for numeric values
    required: true,
    default: 0,
  },
  userid: {
    type: String,
    required: true,
  },
  description: { // Corrected typo
    type: String,
    required: true,
  },
  company: { // Corrected typo
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema); // Corrected model name
export default Product;
