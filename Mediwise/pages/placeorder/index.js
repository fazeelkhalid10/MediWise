import CartContext from '@/helper/cart-context';
import { useContext, useRef } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useSession } from 'next-auth/react';
import styles from '@/styles/placeorder.module.css';

export default function PlaceOrder() {
  const context = useContext(CartContext);
  const { data: session, status } = useSession();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
    };

    console.log('Order Submitted:', formData, context.items);
    alert('Order placed successfully!');
  };

  const calculateTotal = () =>
    context.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.pageContainer}>
      <Header session={session} />
      <main className={styles.mainContent}>
        <div className={styles.orderContainer}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Place Your Order</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" ref={nameRef} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" ref={emailRef} required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Address</label>
                <textarea id="address" ref={addressRef} required className={styles.textarea} />
              </div>
              <button type="submit" className={styles.submitButton}>
                Place Order
              </button>
            </form>
          </div>

          <div className={styles.cartSection}>
            <h2 className={styles.sectionTitle}>Your Cart</h2>
            {context.items.length > 0 ? (
              <>
                <ul className={styles.cartList}>
                  {context.items.map((item) => (
                    <li key={item.id} className={styles.cartItem}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemDetails}>
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={styles.totalSection}>
                  <h3 className={styles.totalText}>Total</h3>
                  <span className={styles.totalAmount}>${calculateTotal().toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

