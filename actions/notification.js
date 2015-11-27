export function add() {
    return {
        type: 'ADD'
    }
}

export function complete(index) {
    return {
        type: 'COMPLETE',
        index
    }
}