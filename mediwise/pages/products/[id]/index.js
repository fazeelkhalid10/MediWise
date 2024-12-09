import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import styles from "@/styles/productdetails.module.css";
import { Header } from '@/pages/components/Header';
import { Footer } from '@/pages/components/Footer';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import CartContext from '@/helper/cart-context';
import useSWR from 'swr';

export async function getServerSideProps(context) {
  const { params } = context;
  const session = await getSession(context);
  const id = params.id;

  try {
    const res = await fetch('http://localhost:3000/api/getpdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await res.json();

    const res1 = await fetch('http://localhost:3000/api/getreview', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productid: id
      })
    });

    const data1 = await res1.json();

    return {
      props: {
        productDetails: data.data,
        review: data1.review
      },
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return {
      props: {
        productDetails: null,
        review: null
      },
    };
  }
}

function ProductDetails({ productDetails, review }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const context = useContext(CartContext);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(review);

  function getreview(uri) {
    fetch(uri, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productid: productDetails._id
      })
    }).then((res) => res.json()).then((data) => setReviews(data.review));
  }

  useSWR('http://localhost:3000/api/getreview', getreview);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      fetch('/api/review', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid: session.user.id,
          productid: productDetails._id,
          reviews: newComment.trim(),
          stars: newRating
        })
      }).then((res) => res.json()).then((data) => getreview('http://localhost:3000/api/getreview'))

      setNewComment('');
      setNewRating(5);
    }
  };

  function addtocart(productid, userid) {
    const data = {
      productid,
      userid
    }

    fetch('/api/addtocart', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      context.addItem(session.user.id);
    });
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.productDetails}>
          <div className={styles.productImageContainer}>
            <Image src={productDetails.imageUrl} alt={productDetails.name} layout="fill" objectFit="cover" className={styles.productImage} />
          </div>
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{productDetails.name}</h1>
            <p className={styles.productCategory}>{productDetails.company}</p>
            <p className={styles.productPrice}>${productDetails.price}</p>
            <p className={styles.productDescription}>{productDetails.description}</p>
            <p className={styles.productStock}>In stock: {productDetails.quantity}</p>
            <div className={styles.productActions}>
              <button className={styles.addToCartButton} onClick={() => addtocart(productDetails._id, session.user.id)}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className={styles.wishlistButton}>
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.productReviews}>
          <h2>Customer Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id} className={styles.review}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewUser}>{review.name}</span>
                <div className={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={i < review.stars ? styles.starFilled : styles.starEmpty} size={16} />
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.reviews}</p>
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
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>{value} Star{value !== 1 ? 's' : ''}</option>
                ))}
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
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetails;

