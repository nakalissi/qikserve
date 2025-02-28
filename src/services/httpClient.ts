import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://cdn-dev.preoday.com',
});

export default httpClient;