import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FacultyContext } from '../../context/FacultyContext';
import '../../css/login.css';
import { gapi } from 'gapi-script';

const LoginPage = () => {
  const [facultyIdInput, setFacultyIdInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const { setFacultyId, setIsAuthenticated } = useContext(FacultyContext);

  const SESSION_DURATION = 0.25 * 60 * 60 * 1000; // 3 hours in milliseconds

  // Google Auth setup
  useEffect(() => {
    function start() {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: '4952283494-jggmf8d19jvo55kqrsd3s6ro5m5hvq2a.apps.googleusercontent.com', 
          scope: 'profile email',
        }).then(() => {
          console.log('Google Auth initialized');
        }).catch((error) => {
          console.error('Error initializing Google Auth', error);
        });
      });
    }
    start();
  }, []);

  // Handle form submit for faculty login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (facultyIdInput === '' || password === '') {
      setError('Faculty ID and password are required.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        facultyId: facultyIdInput,
        password
      });

      if (response.data.message) {
        setSuccess(response.data.message);
        setError('');
        
        // Set the context values
        setFacultyId(facultyIdInput); // Set facultyId in context
        setIsAuthenticated(true); // Mark user as authenticated

        // Store session data in localStorage with a timestamp
        const loginTime = new Date().getTime(); 
        const sessionExpiryTime = loginTime + SESSION_DURATION; // Set session expiration time

        localStorage.setItem('facultyId', facultyIdInput);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('sessionExpiryTime', sessionExpiryTime); // Store expiry time
        localStorage.setItem('userRole', response.data.role); // Store user role

        // Navigate based on the role
        if (response.data.role === 'Admin') {
          navigate('/adminhomepage'); // Redirect admin
        } else {
          navigate('/homepage'); // Redirect user
        }
      }
    } catch (error) {
      setError('Invalid faculty ID or password.');
      setSuccess('');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.signIn().then(async (googleUser) => {
        const tokenId = googleUser.getAuthResponse().id_token;

        try {
          const res = await axios.post('http://localhost:5000/api/google-login', { tokenId });
          const { facultyId, role } = res.data;

          // Set the context values
          setFacultyId(facultyId);
          setIsAuthenticated(true);

          // Store session data in localStorage
          const loginTime = new Date().getTime();
          const sessionExpiryTime = loginTime + SESSION_DURATION;

          localStorage.setItem('facultyId', facultyId);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('loginTime', loginTime);
          localStorage.setItem('sessionExpiryTime', sessionExpiryTime); // Store expiry time
          localStorage.setItem('userRole', role); // Store user role

          // Navigate based on the role
          if (role === 'Admin') {
            navigate('/adminhomepage');
          } else {
            navigate('/homepage');
          }
        } catch (error) {
          setError('Google Sign-In failed.');
          setSuccess('');
        }
      }).catch((error) => {
        setError('Google Sign-In was unsuccessful. Try again later.');
        console.error(error);
      });
    } else {
      setError('Google Auth instance is not initialized.');
      console.error('Google Auth instance is null');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="facultyId">Faculty ID</label>
          <input
            type="text"
            id="facultyId"
            value={facultyIdInput}
            onChange={(e) => setFacultyIdInput(e.target.value)}
            placeholder="Enter your Faculty ID"
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
        <button type="button" className="google-signin-button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;