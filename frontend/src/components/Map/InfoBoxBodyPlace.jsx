import {useSelector} from 'react-redux';
import React from 'react';

function InfoBoxBodyPlace() {

    const activeMarker = useSelector(state=>state.place.activeMarker);

    return ( 
        <div>{activeMarker.name}</div>
     );
}

export default InfoBoxBodyPlace;