import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import postReducer from './reducers/postReducer';


ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();

// export default combineReducers({
//     post: postReducer
// });
