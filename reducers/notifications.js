import _ from 'lodash';

const initialState = [];

export default function notifications(state = initialState, action) {
    const clonedState = _.cloneDeep(state);
    switch (action.type) {
        case 'ADD':
            clonedState.push({moment: new Date().getTime(), completed: false});
            return clonedState;
        case 'COMPLETE':
            clonedState[action.index].completed = true;
            return clonedState;
        default:
            return state
    }
}
