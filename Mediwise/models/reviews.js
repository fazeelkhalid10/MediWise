import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  userid: {
    type: String, // Use Number instead of Int32Array for numeric values
    required: true,
   
  },
  reviews:
  {
type:String,
required:true
},
stars:
  {
type:Number,
required:true,
default:0
}


}, { timestamps: true });

const review = mongoose.models.review || mongoose.model('review', reviewSchema); // Corrected model name
export default review;
