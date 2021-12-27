import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import Startup from './components/startup';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB31iaAcUkokBYZzAF7A93PS6t4-JR0ojo',
  authDomain: 'kulukirjanpito-66d22.firebaseapp.com',
  projectId: 'kulukirjanpito-66d22',
  storageBucket: 'kulukirjanpito-66d22.appspot.com',
  messagingSenderId: '686736408966',
  appId: '1:686736408966:web:bda824d1ab6446a8a3ec07',
  measurementId: 'G-84VSR5TSLW',
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AuthCheck fallback={<Startup />}>
        <App />
      </AuthCheck>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
