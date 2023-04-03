import axios from 'axios';

const API_URL = 'http://localhost:80';

export const getAuthors = () => {
  return axios.get(`${API_URL}/authors`);
}

export const getBooks = () => {
  return axios.get(`${API_URL}/books`);
}

export const getLibraries = () => {
  return axios.get(`${API_URL}/libraries`);
}
