import axios from 'axios';

import {PROD} from './conf.js';

class Place {

    url = PROD ? `http://${window.location.hostname}` : `http://${window.location.hostname}:8000`;

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