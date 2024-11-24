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
      fetch('/api/product', {
       
        method: 'GET',
        headers: {
          'Content-Type': 'application/json' 
        } // Specify the HTTP method
      }).then((res)=>res.json()).then((data)=>{

        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = Array.from(new Set(data.map(p => p.name)));
        setCategories(uniqueCategories);
      });
      
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

