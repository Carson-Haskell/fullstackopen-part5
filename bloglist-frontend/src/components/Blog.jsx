import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <p>Blog: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
