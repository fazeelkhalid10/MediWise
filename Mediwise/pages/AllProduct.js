import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/AllProduct.module.css";
import landingStyles from "@/styles/Landing.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Search, Grid, List, ArrowUpCircle, MessageCircle } from 'lucide-react';
import useProducts from './hooks/useProducts';
import { useSession } from 'next-auth/react';

export default function AllProduct() {
  
  const [layoutType, setLayoutType] = useState('grid');

  const [showScrollTop, setShowScrollTop] = useState(false);
  const {
    filteredProducts,
    searchTerm,
    sortOption,
    setSearchTerm,
    setSortOption,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    setFilteredProducts


  } = useProducts();
  // useEffect(() => {
  //   // In a real application, you would fetch this data from an API
  //   const allProducts = [
  //     { id: 1, name: 'Vitamin C Supplements', price: 9.99, salePrice: 7.99, image: '/vitamin-c.jpg', onSale: true },
  //     { id: 2, name: 'Pain Relief Gel', price: 12.99, salePrice: 10.99, image: '/pain-relief.jpg', onSale: true },
  //     { id: 3, name: 'Allergy Medicine', price: 15.99, salePrice: 13.99, image: '/allergy-med.jpg', onSale: true },
  //     { id: 4, name: 'First Aid Kit', price: 24.99, salePrice: 19.99, image: '/first-aid.jpg', onSale: true },
  //     { id: 5, name: 'Multivitamin Complex', price: 19.99, image: '/multivitamin.jpg', onSale: false },
  //     { id: 6, name: 'Antibacterial Hand Sanitizer', price: 3.99, image: '/hand-sanitizer.jpg', onSale: false },
  //     { id: 7, name: 'Digital Thermometer', price: 14.99, image: '/thermometer.jpg', onSale: false },
  //     { id: 8, name: 'Omega-3 Fish Oil', price: 22.99, image: '/fish-oil.jpg', onSale: false },
  //     { id: 9, name: 'Aspirin', price: 5.99, image: '/aspirin.jpg', onSale: false },
  //     { id: 10, name: 'Bandages', price: 3.99, image: '/bandages.jpg', onSale: false },
  //     { id: 11, name: 'Cough Syrup', price: 8.99, image: '/cough-syrup.jpg', onSale: false },
  //     { id: 12, name: 'Sunscreen SPF 50', price: 12.99, image: '/sunscreen.jpg', onSale: false },
  //     { id: 13, name: 'Vitamin C Supplements', price: 9.99, salePrice: 7.99, image: '/vitamin-c.jpg', onSale: true },
  //     { id: 14, name: 'Pain Relief Gel', price: 12.99, salePrice: 10.99, image: '/pain-relief.jpg', onSale: true },
  //     { id: 15, name: 'Allergy Medicine', price: 15.99, salePrice: 13.99, image: '/allergy-med.jpg', onSale: true },
  //     { id: 16, name: 'First Aid Kit', price: 24.99, salePrice: 19.99, image: '/first-aid.jpg', onSale: true },
  //     { id: 17, name: 'Multivitamin Complex', price: 19.99, image: '/multivitamin.jpg', onSale: false },
  //     { id: 18, name: 'Antibacterial Hand Sanitizer', price: 3.99, image: '/hand-sanitizer.jpg', onSale: false },
  //     { id: 19, name: 'Digital Thermometer', price: 14.99, image: '/thermometer.jpg', onSale: false },
  //     { id: 20, name: 'Omega-3 Fish Oil', price: 22.99, image: '/fish-oil.jpg', onSale: false },
  //     { id: 21, name: 'Aspirin', price: 5.99, image: '/aspirin.jpg', onSale: false },
  //     { id: 22, name: 'Bandages', price: 3.99, image: '/bandages.jpg', onSale: false },
  //     { id: 23, name: 'Cough Syrup', price: 8.99, image: '/cough-syrup.jpg', onSale: false },
  //     { id: 24, name: 'Sunscreen SPF 50', price: 12.99, image: '/sunscreen.jpg', onSale: false },
  //   ];
  //   setProducts(allProducts);
  //   setFilteredProducts(allProducts);
  // }, []);

  console.log(filteredProducts);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const{data:session,status}=useSession();

  if(status==="loading")
    {
  
  return <>Loading...</>
  
  
    }
  return (
    <>
      <Header />
      <main className={styles.allProductPage}>
        <h1 className={styles.pageTitle}>.</h1>
        
        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
          
          <div className={styles.layoutToggle}>
            <button
              onClick={() => setLayoutType('grid')}
              className={`${styles.layoutButton} ${layoutType === 'grid' ? styles.active : ''}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setLayoutType('list')}
              className={`${styles.layoutButton} ${layoutType === 'list' ? styles.active : ''}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className={`${landingStyles.itemGrid} ${styles[layoutType]}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`${landingStyles.item} ${styles.productItem}`}>
              <Image src={product.image} alt={product.name} width={200} height={200} />
              <h3>{product.name}</h3>
              <p className={landingStyles.price}>
                {product.onSale && (
                  <span className={landingStyles.oldPrice}>${product.price.toFixed(2)}</span>
                )}
                ${(product.onSale ? product.salePrice : product.price).toFixed(2)}
              </p>
              <Link href={`/products/${product._id}`} className={landingStyles.button}>View Details</Link>
            </div>
          ))}
        </div>

        {showScrollTop && (
          <button onClick={scrollToTop} className={styles.scrollTopButton}>
            <ArrowUpCircle size={24} />
          </button>
        )}

        <Link href="/About" className={styles.aboutUsButton}>
          <MessageCircle size={24} />
        </Link>
      </main>
      <Footer />
    </>
  );
}

