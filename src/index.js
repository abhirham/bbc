import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
ReactDOM.render(
    <Provider store={createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))}>  
        <App />
    </Provider>
, 
document.querySelector('#root'));