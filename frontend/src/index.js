import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import './index.css';

import AlertTemplate from 'react-alert-template-basic';
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}


ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
  <Provider store={store}>
    <App />
  </Provider>
  </AlertProvider>,
  document.getElementById('root')
);

