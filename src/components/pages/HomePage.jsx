// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import PostService from '../../api/services/PostService';
import SearchBar from '../../api/components/posts/SearchBar';
import PostList from '../../api/components/posts/PostList';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const postService = PostService();
  const defaultImage = 'https://via.placeholder.com/150';

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">

        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

        {loading && <p className="text-center text-xl text-gray-500">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <PostList
          posts={posts}
          searchResults={searchResults}
          searchQuery={searchQuery}
          formatDate={formatDate}
          defaultImage={defaultImage}
        />
      </div>
    </div>
  );
}

export default HomePage;
