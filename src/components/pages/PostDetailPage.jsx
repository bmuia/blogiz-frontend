// src/pages/PostDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../../api/services/PostService';
import PostDetail from '../../api/components/posts/PostDetail';
import LoadingSpinner from '../../api/components/posts/ LoadingSpinner';
import ErrorMessage from '../../api/components/posts/ErrorMessage';
import ShareBox from '../../api/components/posts/ShareBox';

function PostDetailPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSHareBox, setOpenShareBox] = useState(false)

  const postService = PostService();

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const fetchedPost = await postService.getPostById(id); // Fetch the post by ID
        setPost(fetchedPost);
      } catch (err) {
        setError('Failed to fetch post details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]); // Only re-fetch if the ID changes
  

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <PostDetail post={post} />
    </div>
  );
}

export default PostDetailPage;
