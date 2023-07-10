import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    createBlog(title, author, url);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className="formDiv">
      <h2>Upload new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="React Beginners Guide..."
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
            placeholder="John Smith..."
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="url"
            placeholder="www.yourblog.com..."
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlog;
