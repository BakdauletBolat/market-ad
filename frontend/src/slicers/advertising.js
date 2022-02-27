import { createSlice } from '@reduxjs/toolkit';


export const advertisingSlice = createSlice({
    name: 'advertising',
    initialState: {
        advertising: [],
        infoBoxWindowStatus: false,
        activeMarker: undefined,
        createMarkerStatus:false,
        adForm: {
            type_id: 1,
            size: '',
            address: '',
            created_at: '2021-05-24T10:30',
            name: '',
            lat: undefined,
            lng: undefined,
            zoom: 7,
            desription: ''
        }
    },
    reducers: {
        setAdvertising: (state, action) => {
            state.advertising = action.payload
        },
        setInfoBoxWindowStatus: (state,action) => {
            state.infoBoxWindowStatus = action.payload
        },
        setCreateMarkerStatus: (state, action) => {
            state.createMarkerStatus = action.payload
        },
        setActiveMarker: (state, action) => {
            state.activeMarker = action.payload
        },
        setAdForm: (state,action) => {
            state.adForm = action.payload
        }
    }
});

export const { setAdvertising, setInfoBoxWindowStatus, setActiveMarker,setCreateMarkerStatus,setAdForm } = advertisingSlice.actions

export default advertisingSlice.reducer