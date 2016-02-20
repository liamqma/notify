import Firebase from 'firebase';
let instance = null;

export default function getFirebase() {
    if (instance === null) {
        instance = new Firebase('https://scorching-heat-9841.firebaseio.com');
        window.firebase = instance;
    }
    return instance;
}