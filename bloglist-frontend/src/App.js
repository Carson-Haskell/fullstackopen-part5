import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  console.log(user);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  if (user === null) {
    return (
      <>
        <h2>Login to Blog</h2>
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
