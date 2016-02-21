import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import moment from 'moment';
import notie from 'notie';
import _ from 'lodash';
import List from './List';
import * as NotificationActions from '../actions/notification';
import * as AuthActions from '../actions/auth';
import RaisedButton from 'material-ui/lib/raised-button';
import getFirebase from '../util/get-firebase';
import getNotifications from '../util/get-notifications';
import saveNotifications from '../util/save-notifications';
import getAuthData from '../util/get-auth-data';

const ONE_HOUR_IN_milliseconds = 1000 * 60 * 60;
const ONE_MINUTE_IN_milliseconds = 1000 * 60;

function nextNotificationInMilliseconds(lastNotificationMoment) {
    return moment().diff(moment(lastNotificationMoment));
}

function checkNotificationPermission() {
    return new Promise(function (resolve, reject) {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            reject("This browser does not support desktop notification");
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            resolve(true);
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    resolve(true);
                } else {
                    reject('Notification permission denied');
                }
            });
        }
        // Sadly user refused to grant permission
        else {
            reject('Notification permission denied');
        }

    });
}

class App extends Component {
    componentDidMount() {
        checkNotificationPermission();
        this.props.updateAuth(saveNotifications());
    }

    componentWillReceiveProps(nextProps) {
        // User logged in
        if (nextProps.auth.uid && !this.props.auth.uid) {
            getNotifications().then(notifications => {
                this.props.add(notifications);
                this.check(notifications);
            });
        }

        // User logged out
        if (!nextProps.auth.uid && this.props.auth.uid) {

        }

        // Save to firebase
        if (nextProps.notifications.length) {
            saveNotifications(nextProps.notifications);
        }
    }

    check() {

        const notifications = arguments[0] || this.props.notifications;

        if (notifications.length === 0) {
            this.notify();
        } else {
            if (nextNotificationInMilliseconds(notifications[notifications.length - 1].moment) > ONE_HOUR_IN_milliseconds) {
                this.notify();
            } else {
                notie.alert(4, `Next notification will be in ${Math.round((ONE_HOUR_IN_milliseconds - moment().diff(moment(notifications[notifications.length - 1].moment))) / 1000 / 60)} minutes`, 3);
            }
        }

        setTimeout(this.check.bind(this), ONE_MINUTE_IN_milliseconds);

    }

    /**
     * Create a HTML5 notification.
     * When user clicks on the notification, it flags the entry as completed.
     */
    notify() {

        const notification = new Notification("Time to stand up. We want you to live longer!", {
            icon: 'bell.png'
        });
        const nextNotificationIndex = this.props.notifications.length;
        notification.onclick = () => {
            window.open("office-stretches.jpg");
            this.props.complete(nextNotificationIndex);
        };
        this.props.add();
    }

    login() {
        getFirebase().authWithOAuthPopup("facebook", (error, authData) => {
            if (error) throw new Error(error);
            this.props.updateAuth(authData);
        });
    }

    logout() {
        getFirebase().unauth();
        this.props.updateAuth({
            uid: null
        });
    }

    render() {
        if (this.props.auth.uid) {
            return (
                <div>
                    <List {...this.props} />
                </div>
            );
        }

        return (
            <div style={{textAlign: 'right'}}>
                <RaisedButton onMouseDown={this.login.bind(this)} label="Sign in with Facebook" primary={true}/>
            </div>
        );
    }
}

App.propTypes = {
    notifications: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    add: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        notifications: state.notifications,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return _.merge(bindActionCreators(NotificationActions, dispatch), bindActionCreators(AuthActions, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
