import axios from 'axios';

const apiTeste = axios.create({
     baseURL: 'https://curso-java-spring-bot.herokuapp.com/users'
     // baseURL: 'https://cors-anywhere.herokuapp.com/https://curso-java-spring-bot.herokuapp.com/users'
     
});

export default apiTeste;


