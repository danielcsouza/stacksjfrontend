import axios from 'axios';

const api = axios.create({
    baseURL:'https://node-api-danielstackjs.herokuapp.com/'

});

export default api;