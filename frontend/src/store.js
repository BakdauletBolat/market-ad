import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slicers/auth';
import advertisingReducer from './slicers/advertising';
import notificationReducer from './slicers/notification';
import placeReducer from './slicers/places';

export default configureStore({
    reducer: {
        advertising: advertisingReducer,
        auth: authReducer,
        notification: notificationReducer,
        place: placeReducer
    },
  })