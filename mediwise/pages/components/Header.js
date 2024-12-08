import { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import { Pill, Search, ShoppingCart, User, User2 } from 'lucide-react';
import { signOut, useSession } from "next-auth/react";
import styles from '@/styles/header.module.css';
import Cart from './Cart';
import CartContext, { CartContextProvider } from '@/helper/cart-context';


export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const context=useContext(CartContext)
  const searchInputRef = useRef(null);
  const {data:session,status}=useSession();

 
  useEffect(()=>{

    context.addItem(session.user.id);
 // setCartItems(context.items);
 console.log(context.totalAmount);
  
  },[]);
  
  const handleRemoveItem = (id) => {

    context.removeitem(session.user.id,id);
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };
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
  if(status==="loading")
    {
  
  return <div>Loading...</div>;
  
    }
  // const handleCartToggle = () => {
  //   setIsCartOpen(!isCartOpen);
  // };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.headerLogo}>
            <Pill className={styles.logoIcon} size={32} />
            <span>MediWise</span>
          </Link>
          <nav className={styles.desktopNav}>
            <Link href="/Landing" className={styles.headerNavLink}>Home</Link>
            <Link href="/AllProduct" className={styles.headerNavLink}>All Products</Link>
            {session.user.role==="admin"&&
            
            <Link href="/addproduct" className={styles.headerNavLink}>Add Product </Link>

            
            
            }
            <Link href="/About" className={styles.headerNavLink}>About Us</Link>
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
            <button className={styles.headerIcon} onClick={()=>setIsCartOpen(true)}>
              <ShoppingCart size={24} />
            {context.items.length>0?(
        <span className={styles.cartCount}>{context.items.length}</span>



            ):(

        <span className={styles.cartCount}>0</span>

            )


            }  
      
     
            </button>
            <button className={styles.headerIcon} onClick={()=>toggleList()} >
              <User2/>
            </button>
            {showList && (
        <ul className={styles.dropdownList}>
          
          <li>Email: {session.user.email}</li>
          <li>Role: {session.user.role}</li>
        </ul>
      )}
            <button 
              className={styles.logoutButton} 
              onClick={ ()=>signOut({ callbackUrl: "/login" })} 
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
            <Link href="/addproduct" className={styles.mobileNavLink}>Add product</Link>
          </div>
        )}

{isCartOpen && (
        <Cart
          isOpen={isCartOpen}
          onClose={handleCloseCart}
          items={context.items}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
     )} 
      </div>
    </header>
  );
}

