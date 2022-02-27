import axios from 'axios';

class Advertising {

    url = `http://${window.location.hostname}:8000`;
    // url = `http://${window.location.hostname}`;

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