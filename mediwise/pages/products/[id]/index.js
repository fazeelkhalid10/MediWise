import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import styles from "@/styles/productdetails.module.css";
import { Header } from '@/pages/components/Header';
import { Footer } from '@/pages/components/Footer';

// Mock product data (replace with actual data fetching in a real application)
const product = {
  id: '1',
  name: 'Paracetamol',
  description: 'Paracetamol is a common pain reliever and fever reducer. It is used to treat many conditions such as headaches, body aches, toothaches, and colds.',
  price: 5.99,
  image: '/images/paracetamol.jpg',
  category: 'Pain Relief',
  stock: 50,
  rating: 4.5,
  reviews: [
    { id: '1', user: 'John Doe', rating: 5, comment: 'Works great for headaches!' },
    { id: '2', user: 'Jane Smith', rating: 4, comment: 'Good product, but a bit pricey.' },
  ],
};
// This will run server-side before rendering the page
export async function getServerSideProps(context) {
  const { params } = context;  // If you're using dynamic routing, this will get the route params
const id=params.id;
  try {
    // Perform the fetch request to the API endpoint
    const res = await fetch('http://localhost:3000/api/getpdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is JSON
      },
      body: JSON.stringify({ id:id }), // Send the params or any necessary data
    });

    // If the fetch was successful, parse the JSON data
    const data = await res.json();
console.log(data);
    // Return the data as props for your page component
    return {
      props: {
        productDetails: data.data, // Pass the fetched data as props
      },
    };
  } catch (error) {
    console.error('Error fetching product details:', error);

    // In case of an error, you can return an empty object or handle it as needed
    return {
      props: {
        productDetails: null,
      },
    };
  }
}

const ProductDetails = ({productDetails}) => {
  const router = useRouter();
  const { id } = router.query;

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(product.reviews);

  // In a real application, you would fetch the product data based on the ID
  // For now, we'll use the mock data

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newReview = {
        id: String(reviews.length + 1),
        user: 'Current User', // In a real app, you'd get this from authentication
        rating: newRating,
        comment: newComment.trim(),
      };
      setReviews([...reviews, newReview]);
      setNewComment('');
      setNewRating(5);
    }
  };

  return (
    <>
    <Header/>
    <div className={styles.productDetails}>
      <div className={styles.productImage}>
        <Image src={product.image} alt={product.name} width={400} height={400} layout="responsive" />
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{productDetails.name}</h1>
        <p className={styles.productCategory}>{productDetails.company}</p>
        <div className={styles.productRating}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty} />
          ))}
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <p className={styles.productPrice}>${productDetails.price}</p>
        <p className={styles.productDescription}>{productDetails.description}</p>
        <p className={styles.productStock}>In stock: {productDetails.quantity}</p>
        <div className={styles.productActions}>
          <button className={styles.addToCartButton}>
            <ShoppingCart size={20} />
            Add to Cart
          </button>
          <button className={styles.wishlistButton}>
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div className={styles.productReviews}>
        <h2>Customer Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewUser}>{review.user}</span>
              <div className={styles.reviewRating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty} size={16} />
                ))}
              </div>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <h3>Add a Review</h3>
          <div className={styles.ratingInput}>
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className={styles.ratingSelect}
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your review here..."
            className={styles.commentTextarea}
            required
          />
          <button type="submit" className={styles.submitCommentButton}>Submit Review</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;

