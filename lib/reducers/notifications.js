import _ from 'lodash';

const initialState = [];

export default function notifications(state = initialState, action) {
    let clonedState = _.cloneDeep(state);
    switch (action.type) {
        case 'ADD':
            if(Array.isArray(action.data)) {
                clonedState = clonedState.concat(action.data);
            } else if(_.isObject(action.data)) {
                clonedState.push(action.data);
            } else {
                clonedState.push({moment: new Date().getTime(), completed: false});
            }
            return clonedState;
        case 'COMPLETE':
            clonedState[action.index].completed = true;
            return clonedState;
        default:
            return state
    }
}
