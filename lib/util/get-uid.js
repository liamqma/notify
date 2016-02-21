import getAuthData from './get-auth-data';
import _ from 'lodash';

export default function getUid() {
    return _.get(getAuthData(), 'uid');
}