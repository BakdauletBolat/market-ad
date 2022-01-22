import axios from 'axios';

class Place {

    url = 'http://127.0.0.1:8001';

    async getPlaceList() {

        const token = localStorage.getItem('userToken');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` 
              }
        }

       return await axios.get(`${this.url}/api/place/list/`,config)
       .then(response=>response.data)
    }

}

export default Place;