import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "mobx-react";
import { StoreMission } from './Components/storeMissions'

let storeMission = new StoreMission()

const store = { storeMission }
ReactDOM.render(<Provider {...store}>
    <App />{" "}
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
