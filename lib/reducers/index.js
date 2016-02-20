import { combineReducers } from 'redux'
import notifications from './notifications'
import auth from './auth'

const rootReducer = combineReducers({
    notifications,
    auth
});

export default rootReducer
