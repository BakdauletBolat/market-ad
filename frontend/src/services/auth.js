import axios from 'axios';
import {PROD} from './conf.js';

class User {

    url = PROD ? `http://${window.location.hostname}` : `http://${window.location.hostname}:8000`;

    async login(body) {
       return await axios.post(`${this.url}/api/auth/token/`,body)
       .then(response=>response.data)
    }

    async register(body) {
        return await axios.get(`${this.url}/api/auth/register/`)
        .then(response=>response.data)
    }

    async getUser() {
   
        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }
        return await axios.get(`${this.url}/api/auth/me/`,config)
        .then(response=>response.data)
    }

}

export default User;