import moment from 'moment';
import _ from 'lodash';

function now() { return moment().format('DD-MM-YYYY HH:mm'); };

const initialState = [];

export default function notification(state = initialState, action) {
    const clonedState = _.cloneDeep(state);
    switch (action.type) {
        case 'ADD':
            clonedState.push({moment: now(), completed: false});
            return clonedState;
        case 'TOGGLE':
            clonedState[action.index].completed = true;
            return clonedState;
        default:
            return state
    }
}
