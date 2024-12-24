import React, { useEffect, useState } from 'react';
import PostService from '../../api/services/PostService';
import Logout from '../../api/components/auth/Logout';


function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, []); // empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Welcome home</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <Logout />
    </div>
  );
}

export default HomePage;
