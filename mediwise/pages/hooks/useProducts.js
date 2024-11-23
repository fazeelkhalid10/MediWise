import { useState, useEffect } from 'react';



const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      // Replace this with actual API call in a real application
      const dummyProducts = [
        { id: '1', name: 'Product 1', description: 'Description 1', price: 19.99, category: 'Category A', imageUrl: '/images/product1.jpg' },
        { id: '2', name: 'Product 2', description: 'Description 2', price: 29.99, category: 'Category B', imageUrl: '/images/product2.jpg' },
        { id: '3', name: 'Product 3', description: 'Description 3', price: 39.99, category: 'Category A', imageUrl: '/images/product3.jpg' },
        { id: '4', name: 'Product 4', description: 'Description 4', price: 49.99, category: 'Category C', imageUrl: '/images/product4.jpg' },
        { id: '5', name: 'Product 5', description: 'Description 5', price: 59.99, category: 'Category B', imageUrl: '/images/product5.jpg' },
      ];
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
      const uniqueCategories = Array.from(new Set(dummyProducts.map(p => p.category)));
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  return {
    products: filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
  };
};

export default useProducts;

