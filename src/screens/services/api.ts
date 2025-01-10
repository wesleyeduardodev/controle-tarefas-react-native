import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://api-pedidos.us-east-1.elasticbeanstalk.com/api',
    auth: {
        username: "wesley@gmail.com",
        password: "123456",
    },
});
