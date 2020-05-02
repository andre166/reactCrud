import axios from 'axios';

const api = axios.create({
     // Minha API
     baseURL: 'https://api.mockaroo.com/api/343cabd0?count=20&key=609f0780'
     
});

export default api;