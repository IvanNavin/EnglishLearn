import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import './index.css';
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./services/firebase";
import {BrowserRouter} from "react-router-dom";

ReactDom.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>, document.getElementById('root'));