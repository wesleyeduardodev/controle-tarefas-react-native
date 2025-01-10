import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.106:8080/api',
    auth: {
        username: "wesley@gmail.com",
        password: "123456",
    },
});
