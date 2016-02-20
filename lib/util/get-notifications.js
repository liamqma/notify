import getFirebase from './get-firebase';

export default function getNotifications() {

    const authData = getFirebase().getAuth();

    return new Promise(function(resolve) {
        if (!authData || !authData.uid) {
            return resolve([]);
        }

        getFirebase().child('users').child(authData.uid).once('value', function(snap) {
            return resolve(snap.val() ? snap.val().notifications : []);
        });
    });
}