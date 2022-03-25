import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './application';
import reportWebVitals from './reportWebVitals';
import {Provider}  from 'react-redux';
import { store} from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <Application />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();