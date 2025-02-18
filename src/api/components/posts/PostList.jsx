import React from 'react';
import PostCard from './PostCard';

function PostList({ posts, searchResults, searchQuery, formatDate, defaultImage }) {
  const postsToDisplay = searchQuery ? searchResults : posts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            defaultImage={defaultImage}
            formatDate={formatDate}
          />
        ))
      ) : (
        <p className="text-center text-gray-400">No posts found matching your search</p>
      )}
    </div>
  );
}

export default PostList;
