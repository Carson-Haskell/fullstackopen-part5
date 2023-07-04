import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('LoggedInUser');

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
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
      setBlogs([...blogs, savedNote]);

      notify({
        type: 'success',
        content: `New blog added by ${author}: ${title}`,
      });
    } catch (err) {
      notify({ type: 'error', content: 'All fields required' });
    }
  };

  const notify = (message) => {
    console.log(message);
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

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={statusMessage} />

      <button onClick={handleLogout}>Logout</button>

      <NewBlog addBlog={addBlog} />

      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
