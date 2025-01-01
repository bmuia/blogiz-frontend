import React, { useEffect, useState } from 'react';
import PostService from '../../api/services/PostService';
import { FaHeart, FaSearch } from 'react-icons/fa'; // Importing the red heart and search icon

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const postService = PostService();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await postService.getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const defaultImage = 'https://via.placeholder.com/150';

  // Handle search query change and search posts by title
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]); // If search query is empty, clear search results
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-8">Welcome to the Home Page</h1>

        <div className="m-2 flex items-center ">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-2 pl-8  rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-lg"
          />
        </div>

        {loading && <p className="text-center text-xl text-gray-500">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display Search Results if searchQuery is not empty */}
        {searchQuery ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
            {searchResults.length > 0 ? (
              searchResults.map((post) => (
                <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <img
                    src={post.image_url || defaultImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => e.target.src = defaultImage}
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                    <p className="text-sm text-gray-400 mt-4">Created at: {formatDate(post.created_at)}</p>

                    <div className="mt-4 flex flex-col">
                      {/* Display Like Count with Red Heart Icon */}
                      <div className="flex flex-col items-end text-red-500">
                        <FaHeart className="text-3xl" />
                        <span className="mt-2">{post.likes_count} Likes</span> 
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-center">
                <p className="text-center text-gray-400">No posts found matching your search</p>
              </div>
            )}
          </div>
        ) : (
          // Display All Posts if no search query
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img
                  src={post.image_url || defaultImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.src = defaultImage}
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.content}</p>
                  <p className="text-sm text-gray-400 mt-4">Created at: {formatDate(post.created_at)}</p>

                  <div className="mt-4 flex flex-col">
                    {/* Display Like Count with Red Heart Icon */}
                    <div className="flex flex-col items-end text-red-500">
                      <FaHeart className="text-3xl" />
                      <span className="mt-2">{post.likes_count} Likes</span> 
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
