import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../configs/apiConfig';  
import { LOGIN } from '../../configs/authConfig';   
import { setAuthToken, setRefreshToken, getAuthToken } from '../../configs/authConfig'; 
import { useAuth } from '../../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';

const InputForm = ({ type, id, value, onChange, label }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = getApiUrl(LOGIN); 

      const response = await axios.post(url, {
        email,
        password,
      });

      const { access_token, refresh_token } = response.data;

      setAuthToken(access_token);
      setRefreshToken(refresh_token);

      login(); 

      navigate('/home'); // Redirect to the homepage

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <InputForm
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />

        <InputForm
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
