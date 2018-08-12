import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import HomepageMiddle from "./HomepageMiddle";
import HomepageLeft from "./HomepageLeft";
import HomepageRight1 from "./HomepageRight1"


ReactDOM.render(<HomepageLeft />, document.getElementById('left'));
ReactDOM.render(<HomepageMiddle />, document.getElementById('middle'));
ReactDOM.render(<HomepageRight1 />, document.getElementById('right'));


registerServiceWorker();

