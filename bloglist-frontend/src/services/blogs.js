import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newBlog, config);

  return res.data;
};

const update = async (id, updatedBlog) => {
  const url = `${baseUrl}/${id}`;

  const res = await axios.put(url, updatedBlog);

  return res.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${id}`;

  await axios.delete(url, config);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, deleteBlog };
