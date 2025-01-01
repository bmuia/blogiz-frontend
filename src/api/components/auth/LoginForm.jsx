import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../configs/apiConfig';
import { LOGIN } from '../../configs/authConfig';
import { useAuth } from '../../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';

const InputForm = ({ type, id, value, onChange, label }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

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

      const { access, refresh } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      login(access);

      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

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

          {/* Forgot Password Link */}
          <div className="text-right mb-4">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transition duration-300'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
