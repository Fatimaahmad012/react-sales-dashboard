import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const getProducts = () => api.get('/products').then(res => res.data.products);
export const getCarts = () => api.get('/carts?limit=0').then(res => res.data.carts);
export const getUsers = () => api.get('/users?limit=0').then(res => res.data.users);