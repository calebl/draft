import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import configureStore from './configureStore';

import {ThemeProvider} from "styled-components";
import {theme} from "./styles";

const {store, persistor} = configureStore();

// persistor.purge(); //remove for persistance

window.App = {
  start () {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <App/>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
};

window.App.start();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
