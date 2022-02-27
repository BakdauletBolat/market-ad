import React, { useEffect, useRef } from 'react'
import AdvertisingService from '../../services/advertising';
import { useDispatch, useSelector } from 'react-redux';
import { setAdvertising, setInfoBoxWindowStatus } from '../../slicers/advertising';
import { setPlaces, setInfoBoxWindowStatusPlace } from '../../slicers/places';
import MarkerItemAd from './MarkerItemAd';
import MarkerItemPlace from './MarkerItemPlace';
import { InfoWindow,InfoBox } from '@react-google-maps/api';
import PlaceService from '../../services/places';
import InfoBoxBodyPlace from './InfoBoxBodyPlace';
import InfoBoxBodyAd from './InfoBoxAd';

function MapBody() {

    const advertisingService = new AdvertisingService();
    const placeService = new PlaceService();

    const infoBoxWindowStatusAd = useSelector(state => state.advertising.infoBoxWindowStatus);
    const infoBoxWindowStatusPlace = useSelector(state => state.place.infoBoxWindowStatus);
    const activeMarkerAd = useSelector(state => state.advertising.activeMarker);
    const activeMarkerPlace = useSelector(state => state.place.activeMarker);

    const dispatch = useDispatch();

    const advertisingList = useSelector(state => state.advertising.advertising);
    const placesList = useSelector(state => state.place.places)

    useEffect(() => {
        advertisingService.getAdvertisingList()
            .then(data => { dispatch(setAdvertising(data)); console.log(data) })
            .catch(err => console.log(err.response.data));
        placeService.getPlaceList()
            .then(data => dispatch(setPlaces(data)))
            .catch(err=>console.log(err.response.data))
    }, [])

    return (
        <>
            {advertisingList.map(item => (
                <MarkerItemAd
                    key={item.id}
                    item={item}
                />
            ))}
            {placesList.map(item => (
                <MarkerItemPlace
                key={item.id}
                item={item}
            />
            ))}
            {infoBoxWindowStatusAd ? (
                <InfoBox
                    options={{
                        pixelOffset: new window.google.maps.Size(-135,activeMarkerAd.rent != null ? -500 : -360)
                    }}
           
                    
                    onCloseClick={() => dispatch(setInfoBoxWindowStatus(false))}
                    position={{
                        lat: activeMarkerAd.lat,
                        lng: activeMarkerAd.lng
                    }}
                >
                    <InfoBoxBodyAd></InfoBoxBodyAd>
                </InfoBox>
            ) : (
                <div></div>
            )}
            {infoBoxWindowStatusPlace ? (
                <InfoWindow
                onCloseClick={() => dispatch(setInfoBoxWindowStatusPlace(false))}
                position={{
                    lat: activeMarkerPlace.lat,
                    lng: activeMarkerPlace.lng
                }}
            >
                <InfoBoxBodyPlace></InfoBoxBodyPlace>
            </InfoWindow>
            ) : (
                <div></div>
            )}
        </>

    );
}

export default MapBody;