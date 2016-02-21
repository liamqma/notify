import getFirebase from './get-firebase';
import getUid from './get-uid';

export default function getNotifications() {

    return new Promise(function (resolve) {

        const uid = getUid();

        if (!uid) {
            return resolve([]);
        }

        getFirebase().child('users').child(uid).once('value', function (snap) {
            return resolve(snap.val() ? snap.val().notifications : []);
        });
    });
}