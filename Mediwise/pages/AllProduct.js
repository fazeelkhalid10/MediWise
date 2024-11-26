import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "@/styles/AllProduct.module.css";
import landingStyles from "@/styles/Landing.module.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Search, Grid, List } from 'lucide-react';

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [layoutType, setLayoutType] = useState('grid');

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    const allProducts = [
      { id: 1, name: 'Vitamin C Supplements', price: 9.99, salePrice: 7.99, image: '/vitamin-c.jpg', onSale: true },
      { id: 2, name: 'Pain Relief Gel', price: 12.99, salePrice: 10.99, image: '/pain-relief.jpg', onSale: true },
      { id: 3, name: 'Allergy Medicine', price: 15.99, salePrice: 13.99, image: '/allergy-med.jpg', onSale: true },
      { id: 4, name: 'First Aid Kit', price: 24.99, salePrice: 19.99, image: '/first-aid.jpg', onSale: true },
      { id: 5, name: 'Multivitamin Complex', price: 19.99, image: '/multivitamin.jpg', onSale: false },
      { id: 6, name: 'Antibacterial Hand Sanitizer', price: 3.99, image: '/hand-sanitizer.jpg', onSale: false },
      { id: 7, name: 'Digital Thermometer', price: 14.99, image: '/thermometer.jpg', onSale: false },
      { id: 8, name: 'Omega-3 Fish Oil', price: 22.99, image: '/fish-oil.jpg', onSale: false },
      { id: 9, name: 'Aspirin', price: 5.99, image: '/aspirin.jpg', onSale: false },
      { id: 10, name: 'Bandages', price: 3.99, image: '/bandages.jpg', onSale: false },
      { id: 11, name: 'Cough Syrup', price: 8.99, image: '/cough-syrup.jpg', onSale: false },
      { id: 12, name: 'Sunscreen SPF 50', price: 12.99, image: '/sunscreen.jpg', onSale: false },
    ];
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort
    if (sortOption === 'priceLowToHigh') {
      result = [...result].sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
    } else if (sortOption === 'priceHighToLow') {
      result = [...result].sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
    } else if (sortOption === 'alphabetically') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [products, searchTerm, sortOption]);

  return (
    <>
      <Header />
      <main className={styles.allProductPage}>
        <h1 className={styles.pageTitle}>All Products</h1>
        
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
              <Link href={`/product/${product.id}`} className={landingStyles.button}>View Details</Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

