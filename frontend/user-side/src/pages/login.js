//login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const correctUsername = 'user';
  const correctPassword = 'password123';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Username and password are required.');
      setSuccess('');
    } else if (username === correctUsername && password === correctPassword) {
      setSuccess('Login successful!');
      setError('');
      setTimeout(() => {
        navigate('/homepage');
      }, 1000); 
    } else {
      setError('Invalid username or password.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
  );
};

export default LoginPage;
