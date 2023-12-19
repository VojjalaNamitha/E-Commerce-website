import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'; // Import the CSS file for styling

function Signup({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    // Add your signup logic here
    // For simplicity, I'm storing the new user in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { username, email, password };

    // Check if the email is already taken
    if (users.some((user) => user.email === email)) {
      setError('Email is already taken');
    } else {
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onSignUp(); // Notify the App component about the successful signup
    }
  };

  return (
    <div className="signup-container">
      <h1 style={{'fontFamily':'Dancing Script'}}>Sign Up</h1>
      <div>
        <label><b>Username <i class="fa-solid fa-user" style={{"color": "#846586"}}></i>  :</b></label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label><b>Email <i class="fa-solid fa-envelope" style={{"color": "#875a85"}}></i>  :</b></label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label><b>Password <i class="fa-solid fa-lock" style={{"color":" #7f577e"}}></i>  :</b></label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
