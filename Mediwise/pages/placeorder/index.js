import CartContext from '@/helper/cart-context';
import { useContext, useRef } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useSession } from 'next-auth/react';

export default function PlaceOrder() {
  // Accessing cart context
  const context = useContext(CartContext);
  const {data:session,status}=useSession();
  // Refs for form inputs
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Access form data using refs
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
    <>
    <Header session={session}/>
    <div style={styles.container}>
      {/* Left: Order Form */}
      <div style={styles.left}>
        <h2>Place Your Order</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Name:
            <input type="text" ref={nameRef} required style={styles.input} />
          </label>
          <label>
            Email:
            <input type="email" ref={emailRef} required style={styles.input} />
          </label>
          <label>
            Address:
            <textarea ref={addressRef} required style={styles.textarea} />
          </label>
          <button type="submit" style={styles.button}>
            Place Order
          </button>
        </form>
      </div>

      {/* Right: Cart Summary */}
      <div style={styles.right}>
        <h2>Your Cart</h2>
        {context.items.length > 0 ? (
          <>
            <ul style={styles.cartList}>
              {context.items.map((item) => (
                <li key={item.id} style={styles.cartItem}>
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </li>
              ))}
            </ul>
            <h3>Total: ${calculateTotal()}</h3>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>

    <Footer/></>
  );
}

const styles = {
    container: {
        display: 'flex',
        gap: '2rem',
        padding: '2rem',
        marginTop: '2rem', // Add margin from the top
      },
  left: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
  },
  textarea: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    height: '80px',
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  right: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
  },
  cartList: {
    listStyle: 'none',
    padding: 0,
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
};
