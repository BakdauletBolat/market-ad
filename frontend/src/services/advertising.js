import axios from 'axios';

import {PROD} from './conf.js';

class Advertising {

    

    url = PROD ? `http://${window.location.hostname}` : `http://${window.location.hostname}:8000`;

    async getAdvertisingList() {
        

        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }

       return await axios.get(`${this.url}/api/advertising/list/`,config)
       .then(response=>response.data)
    }

    async deleteAdvertising(id) {
        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }
       return await axios.get(`${this.url}/api/advertising/delete/${id}/`,config)
       .then(response=>response.data)
    }

    async createAdvertising(body) {

        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }

       return await axios.post(`${this.url}/api/advertising/list/`,body,config)
       .then(response=>response.data)
    }

}

export default Advertising;