import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import cookies from 'js-cookie';
import configureStore from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

Notification.requestPermission();

const notifications = cookies.get('notifications');
let store = null;

if (notifications) {
    store = configureStore({notification: JSON.parse(notifications)});
} else {
    store = configureStore();
}

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
    </div>,
    document.getElementById('root')
)
