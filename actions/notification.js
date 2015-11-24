export function add() {
    return {
        type: 'ADD'
    }
}

export function toggle(index) {
    return {
        type: 'TOGGLE',
        index
    }
}