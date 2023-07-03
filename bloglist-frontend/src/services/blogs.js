import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
