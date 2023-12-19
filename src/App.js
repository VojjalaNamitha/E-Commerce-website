import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import ProductDetails from './Products/productdetails';
import Header from './Header';
import Cart from './Cart';
import Login from './login';
import Signup from './signup';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const userLoggedIn = localStorage.getItem('loggedIn');
    if (userLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={isLoggedIn ? <Products /> : <Navigate to="/login" />}
          />
          <Route path="/products/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={isLoggedIn? <Cart />:<Navigate to='/login'/>} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/products" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={<Signup onSignUp={() => {}} />} // Do not require login after signup
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
