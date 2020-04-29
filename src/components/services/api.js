import axios from 'axios';

const api = axios.create({
     //Leste Telecom API
     // baseURL: 'https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060'

     // Minha API
     baseURL: 'https://api.mockaroo.com/api/343cabd0?count=20&key=609f0780'
     
});

export default api;