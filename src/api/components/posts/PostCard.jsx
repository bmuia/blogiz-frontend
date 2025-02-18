// src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function PostCard({ post, defaultImage, formatDate }) {
  return (
    <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <img
        src={post.image_url || defaultImage}
        alt={post.title}
        className="w-full h-48 object-cover"
        onError={(e) => e.target.src = defaultImage}
      />
      <div className="p-6">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-2xl font-semibold text-gray-800 hover:underline hover:text-blue-500">{post.title}</h2>
        </Link>
        <p className="text-gray-600 mt-2">{post.content}</p>
        <p className="text-sm text-gray-400 mt-4">Created at: {formatDate(post.created_at)}</p>
        <div className="mt-4 flex flex-col items-end text-red-500">
          <FaHeart className="text-3xl" />
          <span className="mt-2">{post.likes_count} Likes</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
