import React,{useState} from 'react'
import axios from 'axios'
import { getApiUrl } from '../../../configs/apiConfig'
import { RESET_PASSWORD } from '../../../configs/authConfig'

function PasswordRequest() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post(getApiUrl(RESET_PASSWORD), { email });
            setSuccess(true);
          } catch (error) {
            console.error('Password reset request failed:', error);
            setError('Failed to send reset email. Please try again.');
          }
        };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Request Password Reset
      </h2>

      {success ? (
        <p className="text-green-500 text-center">
          If an account exists for the provided email, you will receive a reset email.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 transition duration-300"
          >
            Request Reset
          </button>
        </form>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  </div>
  )
}

export default PasswordRequest