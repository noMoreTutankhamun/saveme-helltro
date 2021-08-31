import axios from 'axios';

export const writePost = ({ title, content }) => {
  return axios.create().post('/write', { title, content });
};
