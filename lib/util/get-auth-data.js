import getFirebase from './get-firebase';

export default function getAuthData() {
    return getFirebase().getAuth();
}