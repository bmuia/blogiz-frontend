import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaHeart } from 'react-icons/fa';
import { getApiUrl } from '../../api/configs/apiConfig';
import { CREATE_POST, SEE_USER_POSTS } from '../../api/configs/postConfig';
import { Link } from 'react-router-dom';


// Reusable ErrorMessage component
const ErrorMessage = ({ message }) => (
  <div className="flex items-center text-red-600 mb-4">
    <FaExclamationCircle className="mr-2" />
    <span>{message}</span>
  </div>
);

// Reusable SuccessMessage component
const SuccessMessage = ({ message }) => (
  <div className="flex items-center text-green-600 mb-4">
    <FaCheckCircle className="mr-2" />
    <span>{message}</span>
  </div>
);

// Reusable FileInput component
const FileInput = ({ onChange, selectedFile }) => (
  <div className="mb-6">
    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
      Select Image
    </label>
    <input
      type="file"
      id="image"
      className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={onChange}
    />
    {selectedFile && (
      <div>
        <p>Filename: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
      </div>
    )}
  </div>
);

function Blog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  function stripHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  const defaultImage = 'https://via.placeholder.com/150';

  const fetchUserPosts = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('Authentication token not found. Please log in again.');
      return;
    }

    try {
      const response = await axios.get(getApiUrl(SEE_USER_POSTS), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        setError('Posts data is not in the expected format.');
      }
    } catch (err) {
      setError('Failed to fetch user posts.');
      console.error(err);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Please provide both title and content.');
      return;
    }

    const post = {
      title,
      content: stripHtml(content),
      image: selectedFile,
    };

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (selectedFile) formData.append('image', selectedFile);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(getApiUrl(CREATE_POST), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      setSelectedFile(null);
      setShowForm(false);
      fetchUserPosts(); // Refresh posts after creating one
    } catch (err) {
      setError(err.message || 'An error occurred while creating the post.');
    }
  };

  useEffect(() => {
    if (!showForm) {
      fetchUserPosts(); // Fetch posts when the form is hidden
    }
  }, [showForm]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-semibold mb-4">My Blog Posts</h1>

      {!showForm ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img
                    src={post.image || defaultImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => e.target.src = defaultImage}
                  />
                  <div className="p-6">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                  </Link>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                    <p className="text-sm text-gray-400 mt-4">Created at: {formatDate(post.created_at)}</p>

                    <div className="mt-4 flex flex-col">
                      <div className="flex flex-col items-end text-red-500">
                        <FaHeart className="text-3xl" />
                        <span className="mt-2">{post.likes_count} Likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="absolute top-4 right-4 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
          >
            Create a Post
          </button>
        </>
      ) : (
        <div className="mt-6 bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create a New Post</h2>

          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}

          <form onSubmit={handleCreatePost}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title of your post"
                required
              />
            </div>

            {/* File Input Component */}
            <FileInput onChange={changeHandler} selectedFile={selectedFile} />

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-100 border border-gray-300 rounded-md shadow-sm"
                placeholder="Write your post content here..."
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Blog;
