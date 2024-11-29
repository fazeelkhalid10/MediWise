import { useState, useEffect } from 'react';



const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  

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
console.log(data.products[0]._id);
        setProducts(data.products);
        setFilteredProducts(data.products);
        const uniqueCategories = Array.from(new Set(data.products.map(p => p.name)));
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

  return {
    filteredProducts,
    searchTerm,
    sortOption,
    setSearchTerm,
    setSortOption,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    setFilteredProducts,
  };
};

export default useProducts;

