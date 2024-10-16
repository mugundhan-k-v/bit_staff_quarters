import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FacultyContext } from '../../context/FacultyContext';
import '../../css/login.css';
import { gapi } from 'gapi-script';

const LoginPage = () => {
  const [facultyId, setFacultyId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { setFacultyId: setGlobalFacultyId, setIsAuthenticated } = useContext(FacultyContext);

  // Initialize the Google API client on component mount
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

    if (facultyId === '' || password === '') {
      setError('Faculty ID and password are required.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { facultyId, password });
      setSuccess(response.data.message);
      setError('');

      // Set the global facultyId and authentication state
      setGlobalFacultyId(facultyId);
      setIsAuthenticated(true);

      // Navigate to the appropriate page based on the role
      if (response.data.role === 'Admin') {
        navigate('/Adminhomepage');
      } else if (response.data.role === 'User') {
        navigate('/homepage');
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

          // Set the global facultyId and authentication state
          setGlobalFacultyId(facultyId);
          setIsAuthenticated(true);

          // Navigate to the appropriate page based on the role
          if (role === 'Admin') {
            navigate('/Adminhomepage');
          } else if (role === 'User') {
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
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
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