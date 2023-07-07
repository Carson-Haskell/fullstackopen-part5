import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const newBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedInUser');

    if (loggedUser) {
      const userJSON = JSON.parse(loggedUser);
      setUser(userJSON);
      blogService.setToken(userJSON.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('LoggedInUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      notify({
        type: 'success',
        content: `${user.name} successfully logged in`,
      });
    } catch (err) {
      notify({
        type: 'error',
        content: 'wrong username or password',
      });
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('LoggedInUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (title, author, url) => {
    try {
      const savedNote = await blogService.create({ title, author, url });

      newBlogRef.current.toggleVisiblity();

      setBlogs([...blogs, savedNote]);

      notify({
        type: 'success',
        content: `New blog added by ${author}: ${title}`,
      });
    } catch (err) {
      notify({ type: 'error', content: 'All fields required' });
    }
  };

  const updateBlog = async (blog) => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const updatedBlog = await blogService.update(blog.id, blogToUpdate);

      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));

      notify({
        type: 'success',
        content: `Blog successfully updated: '${updatedBlog.title}' now has ${updatedBlog.likes} likes!`,
      });
    } catch (err) {
      notify({ type: 'error', content: 'Updated failed' });
    }
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);

    if (
      window.confirm(
        `Are you sure you want to remove '${blogToDelete.title}' by ${blogToDelete.author}?`,
      )
    ) {
      try {
        await blogService.deleteBlog(id);

        setBlogs(blogs.filter((b) => b.id !== id));

        notify({
          type: 'success',
          content: 'Successfully deleted',
        });
      } catch (err) {
        notify({
          type: 'error',
          content: 'Only publisher can delete blog',
        });
      }
    }
  };

  const notify = (message) => {
    setStatusMessage(message);

    setTimeout(() => setStatusMessage(null), 4000);
  };

  if (user === null) {
    return (
      <>
        <h2>Login to Blog</h2>
        <Notification message={statusMessage} />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={statusMessage} />

      <button onClick={handleLogout}>Logout</button>

      <Togglable buttonLabel="New blog" ref={newBlogRef}>
        <NewBlog createBlog={addBlog} />
      </Togglable>

      <br />
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
