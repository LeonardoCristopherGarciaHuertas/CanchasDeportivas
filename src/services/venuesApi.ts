import axios from 'axios';

const API_URL = 'http://localhost:1337/api/sedes';

export const fetchVenues = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};
