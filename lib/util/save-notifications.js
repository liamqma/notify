import getFirebase from './get-firebase';

export default function saveNotifications(notifications) {
    if (getFirebase().getAuth()) {
        getFirebase().child('users').child(getFirebase().getAuth().uid).update({notifications});
    }
}