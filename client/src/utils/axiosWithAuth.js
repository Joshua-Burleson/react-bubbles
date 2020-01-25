import axios from 'axios';

const aWA = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        authorization: localStorage.getItem('token')
    }
});


export const fastAxiosWithAuth = token => axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        authorization: token
    }
});

export default aWA
