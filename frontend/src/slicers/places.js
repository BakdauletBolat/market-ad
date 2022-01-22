import { createSlice } from '@reduxjs/toolkit';

export const placeSlice = createSlice({
    name: 'place',
    initialState: {
        places: [],
        infoBoxWindowStatus: false,
        activeMarker: undefined
    },
    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload
        },
        setInfoBoxWindowStatusPlace: (state,action) => {
            state.infoBoxWindowStatus = action.payload
        },
        setActiveMarker: (state, action) => {
            state.activeMarker = action.payload
        }
    }
});

export const { setPlaces, setInfoBoxWindowStatusPlace, setActiveMarker } = placeSlice.actions

export default placeSlice.reducer