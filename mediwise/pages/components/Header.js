import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Pill, Search, ShoppingCart, User } from 'lucide-react';
import { signOut } from "next-auth/react";
import styles from '@/styles/header.module.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchInputRef.current?.value);
    setIsSearchExpanded(false);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.headerLogo}>
            <Pill className={styles.logoIcon} size={32} />
            <span>MediWise</span>
          </Link>
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.headerNavLink}>Home</Link>
            <Link href="/products" className={styles.headerNavLink}>Products</Link>
            <Link href="/services" className={styles.headerNavLink}>Services</Link>
            <Link href="/contact" className={styles.headerNavLink}>Contact</Link>
          </nav>
          <div className={styles.headerActions}>
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
            <button 
              className={styles.logoutButton} 
              onClick={() => signOut()} 
              aria-label="Log out"
            >
              Logout
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
          </div>
        )}
      </div>
    </header>
  );
}

