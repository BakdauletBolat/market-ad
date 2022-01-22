import axios from 'axios';

class Advertising {

    url = 'http://127.0.0.1:8001';

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