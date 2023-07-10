import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
          <button onClick={() => deleteBlog(blog.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
