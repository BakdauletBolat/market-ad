import React, { useEffect, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoBoxWindowStatusPlace,setPlaces,setActiveMarker } from '../../slicers/places';

export const clearAllSelectionsPlace = (dispatch, list) => {
    dispatch(setPlaces(list.map(item => ({
        ...item,
        zoom: 7
    }))))
}

function MarkerItemPlace({ item }) {

    const dispatch = useDispatch();
    const [scale, setScale] = useState(7);
    const placesList = useSelector(state=> state.place.places)

    useEffect(() => {
        setScale(item.zoom)
    }, [item])



    const onClickMarker = () => {
        clearAllSelectionsPlace(dispatch, placesList);

        dispatch(setActiveMarker(item));
        dispatch(setInfoBoxWindowStatusPlace(true));

        setTimeout(() => {
            setScale(10);
        }, 1)

    }

    const onOnmount = () => {
        console.log('jj')
    }

    return (
        <Marker key={item.id}
            label={{
                text: item.type.icon_text,
                fontFamily: "Material Icons",
                color: "#ffffff",
                fontSize: "15px",
            }}
            icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: item.type.color,
                fillOpacity: 1,
                strokeColor: item.type.color,
                scale: scale,
            }}
            onClick={onClickMarker}
            onUnmount={onOnmount}
            position={{
                lat: item.lat,
                lng: item.lng
            }}></Marker>
    );
}

export default MarkerItemPlace;