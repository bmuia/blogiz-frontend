import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from '../api/components/auth/Logout';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const getTokenExpiry = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000; 
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      navigate('/login'); 
      return;
    }

    const tokenExpiry = getTokenExpiry(token);
    if (!tokenExpiry) {
      navigate('/login'); // Redirect to login if the token is invalid
      return;
    }

    // Update the remaining time until the token expires
    const updateRemainingTime = () => {
      const now = Date.now();
      const remainingTime = tokenExpiry - now;

      if (remainingTime <= 0) {
        setTimeRemaining(0);
        navigate('/login'); // Redirect to login if the token has expired
      } else {
        setTimeRemaining(remainingTime);
      }
    };

    updateRemainingTime(); // Initial check

    // Set an interval to check the remaining time every second
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [navigate]);

  // Function to format the remaining time in seconds, minutes, and hours
  const formatRemainingTime = (remainingTime) => {
    if (remainingTime <= 0) return 'Token expired';
    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg top-0 left-0 w-full relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-yellow-400 transition duration-300">
            BlogSpace
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/subscriptions" className="hover:text-yellow-400 transition duration-300">
              Subscriptions
            </Link>
          </li>
          <li>
            <Link to="/my-blogs" className="hover:text-yellow-400 transition duration-300">
              My Blogs
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>

        {/* Display remaining time for token */}
        <div className="text-white">
          {timeRemaining !== null && (
            <span
              className="bg-black text-green-500 px-3 py-1 text-xs font-mono rounded-sm"
              style={{ border: '1px solid #00FF00', fontFamily: 'monospace', letterSpacing: '0.1em' }}
            >
              Token expires in: {formatRemainingTime(timeRemaining)}
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        <button
          onClick={toggleDropdown}
          className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Profile
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 top-full mt-2 right-0 z-50`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
