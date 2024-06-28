import axios from "axios";

// API component manages communication with external APIs, handling requests and responses to the server
const API = axios.create({ baseURL: process.env.REACT_APP_API });
API.interceptors.request.use((req) => {
  return req;
});

// APIs endpoints
export const addUser = (data) => API.post(`/user`, data);
export const allUsers = () => API.get(`/users`);
export const deleteUser = (id) => API.delete(`/deleteUser/${id}`);
export const updateUser = (id, data) => API.put(`/updateUser/${id}`, data);
export const login = (data) => API.post(`/login`, data);
