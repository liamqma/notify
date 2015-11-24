import moment from 'moment';

const initialState = [
    {
        moment: moment(),
        completed: true
    }
];

export default function notification(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return state.slice(0).push({moment: moment(), completed: false});
        default:
            return state
    }
}
