import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostDetail({ post }) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/home'); 
      };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className='flex justify-end'>
            <button className='bg-red-500 p-3 text-white rounded-lg hover:bg-red-700' onClick={handleGoBack}>Go back</button>
        </div>
      <h1 className="text-4xl font-extrabold text-center text-black-600 mb-6 sm:text-5xl">
        {post.title}
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src={post.image_url || 'https://via.placeholder.com/150'}
          alt={post.title}
          className="w-full max-w-3xl h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="prose prose-indigo max-w-none mb-8">
        <p>{post.content}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 mt-6">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">Author:</span>
          <span className="text-gray-600">{post.author?.first_name || 'Anonymous'}</span>
        </div>
        <p className="text-gray-400 mt-2 sm:mt-0">
          Created at: {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="mt-8 flex justify-center space-x-6">
        {/* Share Button */}
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Share
        </button>

        {/* Like Button */}
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          Like
        </button>

        {/* Comment Button */}
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Comment
        </button>
      </div>
    </div>
  );
}

export default PostDetail;
