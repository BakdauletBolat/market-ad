import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { exampleMapStyles } from '../utils/styles';
import MapBody from '../components/Map/MapBody';
import { useDispatch, useSelector } from 'react-redux';
import { setInfoBoxWindowStatus,setAdForm } from '../slicers/advertising';
import { setInfoBoxWindowStatusPlace } from '../slicers/places';
import { clearAllSelectionsAd } from '../components/Map/MarkerItemAd';
import { clearAllSelectionsPlace } from '../components/Map/MarkerItemPlace';
import CreateAd from '../components/Map/CreateMarker';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

function Map() {

    const center = {
        lat: 42.31608604630886,
        lng: 69.5955573917309
    };

    const dispatch = useDispatch();

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBUVRGCl79p01aB2YhioP6s3bURSLV0qDE"
    })

    const mapRef = useRef(null);

    const createMarkerStatus = useSelector(state=>state.advertising.createMarkerStatus);

    const adForm = useSelector(state=>state.advertising.adForm);

    useEffect(() => {
        console.log('center');
        const token = localStorage.getItem('userToken');

    const chatSocket = new WebSocket(
        'ws://'
        + '89.223.67.169'
        + '/ws/online-users/'
        + `?token=${token}`
    );
    }, [])

    const placesList = useSelector(state => state.place.places);
    const advertisingList = useSelector(state => state.advertising.advertising);

    const [path,setPath] = useState(null);

    const onLoadMap = (mapInstanse) => {
        mapInstanse.setCenter({ lat: 42.31608604630886, lng: 69.5955573917309 });
        mapRef.current = mapInstanse
    }

    const onUnmountMap = (mapInstanse) => {
        console.log(mapInstanse);
    }
    

    return isLoaded ? (
        <>
            <GoogleMap
                onLoad={onLoadMap}
                onUnmount={onUnmountMap}
                mapContainerStyle={containerStyle}
                zoom={14}
                options={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    styles: exampleMapStyles,
                    disableDefaultUI: true,
                }}
                clickableIcons
                onClick={(event) => {
                    console.log()

                    if (createMarkerStatus) {
                        const path = event.latLng.toJSON();
                        dispatch(setAdForm({
                            ...adForm,
                            lat: path.lat,
                            lng: path.lng
                        }))
                    }
                    dispatch(setInfoBoxWindowStatus(false));
                    dispatch(setInfoBoxWindowStatusPlace(false));
                    clearAllSelectionsAd(dispatch, advertisingList);
                    clearAllSelectionsPlace(dispatch, placesList);
                }}
            >
                <MapBody></MapBody>
                {createMarkerStatus && (
                    <CreateAd></CreateAd>
                )}
                
            </GoogleMap>

        </>
    ) : <></>
}

export default Map