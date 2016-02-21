import getFirebase from './get-firebase';
import getUid from './get-uid';

export default function saveNotifications(notifications) {

    const uid = getUid();

    if (uid) {
        getFirebase().child('users').child(uid).update({notifications});
    }
}