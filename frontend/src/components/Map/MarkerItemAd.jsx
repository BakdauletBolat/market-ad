import React, { useEffect, useState } from 'react';
import { Marker,InfoWindow } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAdvertising, setActiveMarker, setInfoBoxWindowStatus } from '../../slicers/advertising';

export const clearAllSelectionsAd = (dispatch, list) => {
    dispatch(setAdvertising(list.map(item => ({
        ...item,
        zoom: 7
    }))))
}

function MarkerItemAd({ item }) {

    const dispatch = useDispatch();
    const [scale, setScale] = useState(7);
    const advertisingList = useSelector(state => state.advertising.advertising);

    useEffect(() => {
        setScale(item.zoom)
    }, [item])



    const onClickMarker = () => {
        clearAllSelectionsAd(dispatch, advertisingList);

        dispatch(setActiveMarker(item));
        dispatch(setInfoBoxWindowStatus(true));

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

export default MarkerItemAd;