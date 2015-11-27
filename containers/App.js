import React, { Component, PropTypes } from 'react';
import cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import moment from 'moment';
import notie from 'notie';
import List from '../components/List';
import * as NotificationActions from '../actions/notification'

const ONE_HOUR_IN_milliseconds = 1000 * 60 * 60;
const ONE_MINUTE_IN_milliseconds = 1000 * 60;

function nextNotificationInMilliseconds(lastNotificationMoment) {
    return moment().diff(moment(lastNotificationMoment));
}

class App extends Component {
    componentDidMount() {

        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            this.check();
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    this.check();
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        cookies.set('notifications', nextProps.notifications, {expires: 365});
    }

    check() {

        const {notifications} = this.props;

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


    render() {

        return (
            <div>
                <List {...this.props} />
            </div>
        );
    }
}

App.propTypes = {
    notifications: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        notifications: state.notifications
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(NotificationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
