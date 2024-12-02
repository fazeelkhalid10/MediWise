import React from 'react';
import { X, Trash2 } from 'lucide-react';

import styles from '@/styles/cart.module.css'
import { useRouter } from 'next/router';

export default function Cart({ isOpen, onClose, items = [], onRemoveItem, onUpdateQuantity }) {

  const router=useRouter();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <h2>Your Cart</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className={styles.itemActions}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                  <button onClick={() => onRemoveItem(item.productid)} className={styles.removeButton}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.cartFooter}>
          <div className={styles.total}>
            <strong>Total:</strong> ${total.toFixed(2)}
          </div>
          <button className={styles.checkoutButton} onClick={()=>router.push('/placeorder')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
