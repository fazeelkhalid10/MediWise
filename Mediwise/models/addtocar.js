import mongoose from 'mongoose';

const addtocarSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  userid: {
    type: String, // Use Number instead of Int32Array for numeric values
    required: true,
   
  }
}, { timestamps: true });

const addtocart = mongoose.models.addtocart || mongoose.model('addtocart', addtocarSchema); // Corrected model name
export default addtocart;
