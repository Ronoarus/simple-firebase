import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from 'firebase';
import 'firebase/firestore';

import { FIREBASE_CONFIG } from './constants'

firebase.initializeApp(FIREBASE_CONFIG);

const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export const Context = React.createContext();

ReactDOM.render(
  <Context.Provider value={{
    firestore,
    storage,
    auth,
  }}>
      <App />
  </Context.Provider>,
  document.getElementById('root')
);

