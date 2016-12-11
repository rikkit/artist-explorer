import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Provider } from 'react-redux';
import Reducers from './reducers';
import { combineReducers, createStore } from 'redux'
import App from './components/app';
import * as Actions from './actions';
import Cache from './cache'

const store = createStore(Reducers)

// Resize the app component to the size of the window.
$(document).ready(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector('#app-root')
    );

    let resizeTimer;

    const resizeTimeoutMs = 100;
    let appRoot = $("#app-root");  
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

    // load the fake data
    // TODO set up socket connection
    $.ajax("./artists.json", {
      success: (result) => {
        Cache.saveModel("artists", result.artists);
        store.dispatch({ type: Actions.INITIALISE }) 
      },
      error: (e) => {
        alert("couldn't find artists.json" + e);
      } 
    });
});
