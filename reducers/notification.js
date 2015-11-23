import moment from 'moment';

const initialState = [
    {
        moment: moment()
    }
];

export default function notification(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return state.slice(0).push(action.data);
        default:
            return state
    }
}
