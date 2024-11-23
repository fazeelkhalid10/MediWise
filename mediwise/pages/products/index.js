import React from 'react';
import Card from '../components/Card';
import useProducts from '../hooks/useProducts';
import styles from "@/styles/Products.module.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function Products() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
  } = useProducts();

  return (
    <>
    <div className={styles.productsPage}>
<Header/>
      <aside className={styles.sidebar}>
        <h2>Filters</h2>
        <div className={styles.filterSection}>
          <h3>Company</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h3>Price Range</h3>
          <div className={styles.priceInputs}>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className={styles.input}
            />
            <span>to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className={styles.input}
            />
          </div>
        </div>
      </aside>
      <main className={styles.productGrid}>
        {products.map((product) => (
          <Card/>
        ))}
      </main>
     
    </div>
     <Footer/>
     </>
  );
}

