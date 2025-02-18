import React from 'react';

function SearchBar({ searchQuery, handleSearch }) {
  return (
    <div className="m-2 flex items-center">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="p-2 pl-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-lg"
      />
    </div>
  );
}

export default SearchBar;
