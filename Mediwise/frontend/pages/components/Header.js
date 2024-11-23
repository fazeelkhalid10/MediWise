

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Pill, Search, ShoppingCart, User } from 'lucide-react'
import cart from "@/styles/cart.module.css";

import styles from "@/styles/header.module.css";
import Cart from './Cart';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchExpanded])

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Handle search submission here
    alert(searchInputRef.current?.value)
    console.log('Search submitted:', searchInputRef.current?.value)
    setIsSearchExpanded(false)
  }

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: quantity } : item
    ))
  }

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : styles.headerTransparent}`}>
        <nav className={styles.container}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.headerLogo}>
              <Pill className={styles.logoIcon} size={32} />
              <span>MediWise</span>
            </Link>
            <div className={styles.desktopNav}>
              <Link href="/" className={styles.headerNavLink}>Home</Link>
              <Link href="/products" className={styles.headerNavLink}>Products</Link>
              <Link href="/services" className={styles.headerNavLink}>Services</Link>
              <Link href="/contact" className={styles.headerNavLink}>Contact</Link>
            </div>
            <div className={styles.desktopNav}>
              <div className={`${styles.searchContainer} ${isSearchExpanded ? styles.expanded : ''}`}>
                <button className={styles.headerIcon} onClick={handleSearchToggle}>
                  <Search size={24} />
                </button>
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                  />
                </form>
              </div>
              <button className={styles.headerIcon} onClick={handleCartToggle}>
                <ShoppingCart size={24} />
              </button>
              <button className={styles.headerIcon}>
                <User size={24} />
              </button>
            </div>
            <button 
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink}>Home</Link>
              <Link href="/products" className={styles.mobileNavLink}>Products</Link>
              <Link href="/services" className={styles.mobileNavLink}>Services</Link>
              <Link href="/contact" className={styles.mobileNavLink}>Contact</Link>
              <div className={styles.mobileIcons}>
                <button className={styles.headerIcon}>
                  <Search size={24} />
                </button>
                <button className={styles.headerIcon} onClick={handleCartToggle}>
                  <ShoppingCart size={24} />
                </button>
                <button className={styles.headerIcon}>
                  <User size={24} />
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  )
}

