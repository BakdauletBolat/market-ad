import axios from 'axios';

class Place {

    url = 'http://89.223.67.169';

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