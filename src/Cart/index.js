import React, { useState, useEffect } from 'react';
import './cart.css';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    return storedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }));
  });

  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total number of items in the cart
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);

    // Calculate the total price of items in the cart
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <>
      <h1>Cart Component</h1>
      <div id="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <div>
              <img className="product-thumbnail" src={item.thumbnail} alt={`Product ${index}`} />
              <p>
                <b>Title:</b>
                {item.title}
              </p>
              <p>
                <b>Price:</b>
                {item.price}
              </p>
              <p>
                <b>Quantity:</b> {item.quantity}
              </p>
              <p>
                <b>Total:</b> {item.price * item.quantity}
              </p>
            </div>
            <div>
              <button onClick={() => handleIncrement(index)}>+</button>
              <button onClick={() => handleDecrement(index)}>-</button>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div id="cart-total">
        <p>Items in Cart: {cartCount}</p>
        <p><b>Total Price: {totalPrice} </b></p>
        {/* You can use the cartCount and totalPrice variables to display the count and total price on your cart button */}
        <Link to="/products"><button>Back to products</button></Link>
      </div>
    </>
  );
}

export default Cart;
