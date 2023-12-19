import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header({ onSearch, isLoggedIn, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <header style={{ position: 'sticky' }}>
      <div id="header" style={{ position: 'relative', alignItems: 'stretch' }}>
        
        <Link to="/">
          <button className='btn'> Home  <i className="fa-solid fa-house"></i></button>
        </Link>
        <Link to="/products">
          <button className='btn'>Products</button>
        </Link>
        <Link to="/cart">
          <button className='btn'>Cart <i className="fa-solid fa-cart-shopping"></i></button>
        </Link>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search <i className="fa-solid fa-magnifying-glass"></i></button>
        {isLoggedIn ? (
          <React.Fragment>
            <Link to="/cart">
              <button className='btn'>Cart Details</button>
            </Link>
            <button className='btn' onClick={onLogout}>
              Logout  <i className="fa-solid fa-right-to-bracket" style={{ color: '#27afb9' }}></i>
            </button>
          </React.Fragment>
        ) : (
          <Link to='/login'>
            <button className='btn'>Login  <i className="fa-solid fa-right-to-bracket" style={{ color: '#27afb9' }}></i></button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
