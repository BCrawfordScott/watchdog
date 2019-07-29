import React from 'react';
import ReactDOM from 'react-dom';
import JWTDecode from 'jwt-decode';
import * as serviceWorker from './serviceWorker';
import Root from './components/root';
import configureStore from './store/configureStore';
import { setAuthToken } from './util/sessionAPIUtil';
import { logout } from './actions/sessionActions';
import { config } from 'winston';

document.addEventListener('DOMContentLoaded',() => {
  let store;
  const { jwToken } = localStorage;

  if (jwToken) {
    setAuthToken(jwToken);
    const user = JWTDecode(jwToken);
    const preloadedState = {
      session: {
        authenticated: true,
        user,
      }
    }

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000

    if (user.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    
  }
});

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
