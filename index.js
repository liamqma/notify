import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import cookies from 'js-cookie';
import configureStore from './store/configureStore';

const notifications = cookies.get('notifications');
let store = null;

if (notifications) {
    store = configureStore({notifications: JSON.parse(notifications)});
} else {
    store = configureStore();
}

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
)
