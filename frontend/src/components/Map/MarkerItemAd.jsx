import React, { useEffect, useState } from 'react';
import { Marker,InfoWindow } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAdvertising, setActiveMarker, setInfoBoxWindowStatus } from '../../slicers/advertising';

export const clearAllSelectionsAd = (dispatch, list) => {
    dispatch(setAdvertising(list.map(item => ({
        ...item,
        zoom: 7
    }))));
}

function MarkerItemAd({ item }) {

    const dispatch = useDispatch();
    const [scale, setScale] = useState(7);
    const advertisingList = useSelector(state => state.advertising.advertising);

    useEffect(() => {
        setScale(item.zoom)
    }, [item]);



    const onClickMarker = () => {
        clearAllSelectionsAd(dispatch, advertisingList);

        dispatch(setActiveMarker(item));
        dispatch(setInfoBoxWindowStatus(true));

        setTimeout(() => {
            setScale(10);
        }, 1);

        // const el = document.querySelectorAll('.infoBox');

        // el.forEach(element => {
        //     element.style.transform = 'translate3d(-50%, -100%, 0px)!important';
        // });

    }

    const onOnmount = () => {
        console.log('jj');
    }

    let color = '';

    if (item.rent != null) {
        let now = new Date();
        let l = item.rent.length;
        let end_time = new Date(item.rent[l-1].end_time);

        var difference= Math.abs(end_time-now);

        difference = difference/(1000 * 3600 * 24);
        let day = parseInt(difference);
        console.log(day);

        if (day < 15) {
            color = '#ffd600'
        }
        else{
            color = '#ff3d00';
        }
   
    }
    else {
        color = '#64dd17'
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
                fillColor: color,
                fillOpacity: 1,
                strokeColor: color,
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