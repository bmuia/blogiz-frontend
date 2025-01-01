import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl } from '../../../configs/apiConfig'
import { RESET_PASSWORD_CONFIRM } from '../../../configs/authConfig'

function ResetPassword() {
    const { token } = useParams(); // Retrieve token from URL
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        if (password !== passwordConfirm) {
          setError('Passwords do not match');
          return;
        }
    
        try {
          await axios.post(getApiUrl(RESET_PASSWORD_CONFIRM), {
            token,
            password,
          });
          setSuccess(true);
        } catch (error) {
          console.error('Password reset failed:', error);
          setError('Failed to reset password. Please try again.');
        }
      };
    
      if (success) {
        setTimeout(() => navigate('/login'), 3000); 
      }
    
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Reset Password
        </h2>

        {success ? (
          <p className="text-green-500 text-center">
            Password reset successful! Redirecting to login...
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword