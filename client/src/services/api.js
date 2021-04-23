import axios from 'axios';

let baseURL;
const localApi = 'http://localhost:3001/';
if (process.env.NODE_ENV === 'production') {
  baseURL = '??';
} else if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3001';
}
export const api = axios.create({
  baseURL,
});

export const apiUrl = {
  localApi,
};
