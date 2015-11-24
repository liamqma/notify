import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { devTools, persistState } from 'redux-devtools'
import reducer from '../reducers'

export default function configureStore(initialState) {


    const finalCreateStore = compose(
        // Enables your middleware:
        applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
        // Provides support for DevTools:
        devTools(),
        // Lets you write ?debug_session=<name> in address bar to persist debug sessions
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    const store = finalCreateStore(reducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
