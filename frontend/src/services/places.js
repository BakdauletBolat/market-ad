import axios from 'axios';

class Place {

    url = `http://${window.location.hostname}:8000`;
    // url = `http://${window.location.hostname}`;

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