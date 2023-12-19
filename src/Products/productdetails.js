import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './product.css';

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://dummyjson.com/products/${id}`).then((res) => {
        setProductDetails(res.data);
      });
    }
  }, [id]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(productDetails);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Product added to cart!');
  };

  if (!productDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Product Details Component</h1>
      <div id="product-spec-wrapper">
        <img id="product-spec-image" src={productDetails.thumbnail} alt={productDetails.title} />
        <div id="small-images-wrapper">
          {productDetails.images.map((smallimage, i) => (
            <div
              onClick={() => {
                setProductDetails((prevDetails) => ({
                  ...prevDetails,
                  thumbnail: smallimage,
                }));
              }}
              className="small-image-wrapper"
              key={i}
            >
              <img className="small-image-thumbnail" src={smallimage} alt={`Small Image ${i}`} />
            </div>
          ))}
        </div>
        <div id="product-spec-content">
          <p><b>Title:</b> {productDetails.title}</p>
          <p><b>Price:</b> {productDetails.price}</p>
          <p><b>Rating:</b> {productDetails.rating}</p>
          <p><b>Left over stock:</b> {productDetails.stock}</p>
          <p><b>Discount:</b> {productDetails.discountPercentage}</p>
          <p><b>Description:</b> {productDetails.description}</p>
          <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
