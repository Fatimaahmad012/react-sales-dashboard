import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const getProducts = () => api.get('/products?limit=100').then(res => res.data.products);
export const getCarts = () => api.get('/carts').then(res => res.data.carts);
export const getUsers = () => api.get('/users').then(res => res.data.users);