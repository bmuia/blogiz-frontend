import axios from 'axios';
import { SEE_POST, CREATE_POST, UPDATE_POST, DELETE_POST } from '../configs/postConfig';
import { getApiUrl } from '../configs/apiConfig';


const PostService = () => {


  const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    console.log("Retrieved token:", token);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch all posts
  const getPosts = async () => {
    try {
      const url = getApiUrl(SEE_POST);
      const headers = getAuthHeader();
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch posts");
    }
  };

  // Create a new post
  const createPost = async (post) => {
    try {
      const url = getApiUrl(CREATE_POST);
      const headers = getAuthHeader();
      const response = await axios.post(url, post, { headers });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  };

  // Update an existing post
  const updatePost = async (postId, postData) => {
    try {
      const url = getApiUrl(UPDATE_POST.replace('<int:pk>', postId));
      const headers = getAuthHeader();
      const response = await axios.put(url, postData, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      const url = getApiUrl(DELETE_POST.replace('<int:pk>', postId));
      const headers = getAuthHeader();
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
  };

  return {
    getPosts,
    createPost,
    updatePost,
    deletePost,
  };
};

export default PostService;
