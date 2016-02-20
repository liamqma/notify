export function add(data) {
    return {
        type: 'ADD',
        data
    }
}

export function complete(index) {
    return {
        type: 'COMPLETE',
        index
    }
}