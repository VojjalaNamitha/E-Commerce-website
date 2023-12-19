// Products.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './product.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      });
  }, []);

  const addToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = products.find(product => product.id === productId);

    if (productToAdd) {
      cartItems.push(productToAdd);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      alert('Product added to cart!');
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <h1>Products Component</h1>
      <div id="search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="product-wrapper">
        {filteredProducts.map((product, i) => (
          <Link to={`/products/details/${product.id}`} key={i} style={{ textDecoration: 'none' }}>
            <div className='product-card'>
              <img className="product-thumbnail" src={product.thumbnail} alt={`Product ${i}`} />
              <p><b>Title :</b> {product.title}</p>
              <p><b>Price :</b> {product.price}</p>
              <p><b>Rating :</b> {product.rating}</p>
              <p><b>Description :</b> {product.description}</p>
              <button className="add-to-cart-button" onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
