import axios from 'axios';

const API = axios.create({
    baseURL: 'https://rosybrown-aardvark-571703.hostingersite.com/server/public/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginAPI = (credentials) => API.post('/login', credentials);
export const registerAPI = (data) => API.post('/register', data);
export const logoutAPI = () => API.post('/logout');

export const getMovies = () => API.get('/movies');
export const getMovieDetail = (id) => API.get(`/movies/${id}`);
export const addMovie = (data) => API.post('/movies', data);

export const getCategories = () => API.get('/categories');

export const fetchUsers = () => API.get('/users');
export const fetchUserDetail = (id) => API.get(`/users/${id}`);

export default API;