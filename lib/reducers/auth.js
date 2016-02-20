import _ from 'lodash';

const initialState = {
    uid: null
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return Object.assign({}, state, action.data);
        default:
            return state
    }
}
