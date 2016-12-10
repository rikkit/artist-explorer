import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import Reducers from './reducers';
import { combineReducers, createStore } from 'redux'
import App from './components/app';

const store = createStore(Reducers)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
});

// Resize the app component to the size of the window.
$(document).ready(() => {
    let resizeTimer;

    const resizeTimeoutMs = 100;
    let appRoot = $("#app").first();  
    function onViewportResize() {
        // width is handled with CSS, top margin provided by header
        appRoot.height(document.documentElement.clientHeight);
    }

    onViewportResize();

    // throttle resize events
    // http://stackoverflow.com/a/5490021
    window.onresize = function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(onViewportResize, resizeTimeoutMs);
    };
});
