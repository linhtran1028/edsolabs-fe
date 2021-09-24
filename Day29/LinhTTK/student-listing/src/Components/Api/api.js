import axios from 'axios';

export const getStudent = async () => {
  return await axios.get(`${process.env.REACT_APP_API_STUDENT}`);
};
export const getUser = async (username, password) => {
  return await axios.get(`${process.env.REACT_APP_API_USERS}`, {
    params: { username, password },
  });
};
