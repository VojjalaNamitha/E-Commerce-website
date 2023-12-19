import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formClicked, setFormClicked] = useState(false);

  const handleLogin = () => {
    // Validate email and password
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    // Add your authentication logic here
    // For simplicity, I'm using a basic check for demonstration purposes
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(); // Notify the App component about the successful login
    } else {
      setError('Invalid email or password');
    }
  };

  const handleClick = () => {
    setFormClicked(true);
  };

  return (
    <div className={`login-container${formClicked ? ' form-clicked' : ''}`}>
      <h1 style={{'fontFamily':'cursive','color':'dimgray'}}>Login 🔐</h1>
      <div>
        <label><b>Email✉️ :</b></label>
        <input 
          type="text" required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClick={handleClick}
        />
      </div>
      <div>
        <label><b>Password 🔐:</b></label>
        <input
          type="password" required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={handleClick}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}<br></br>
      <button onClick={handleLogin}>Login</button>
      <p style={{fontFamily:'cursive'}}>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;
