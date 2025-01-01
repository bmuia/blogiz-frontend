import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:text-red-500 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Logout
    </button>
  );
}

export default Logout;
