import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="blog">
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <p>
            Blog: <a href={blog.url}>{blog.url}</a>
          </p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={() => updateBlog(blog)}>Like</button>
          </p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
