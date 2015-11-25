import React, { Component, PropTypes } from 'react'
import cookies from 'js-cookie';
import moment from 'moment';
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const FontIcon = require('material-ui/lib/font-icon');
import {add} from '../actions/notification';

const ONE_HOUR_IN_milliseconds = 1000 * 60 * 60;

function notify() {
    var notification = new Notification("Time to stand up. We want you to live longer!", {
        icon: 'assets/images/icon.svg'
    });
    notification.onclick = function () {
        window.open("https://draggarwal.files.wordpress.com/2012/06/office-stretches.jpg");
    };
}

class List extends Component {
    componentDidMount() {

        const now = moment();
        const lastNotification = this.props.notifications[this.props.notifications.length - 1];
        if (lastNotification) {

            const listNotificationMoment = moment(lastNotification.moment, 'DD-MM-YYYY HH:mm');

            if (now.diff(listNotificationMoment) > ONE_HOUR_IN_milliseconds) {
                this.notify();
                setInterval(this.notify.bind(this), ONE_HOUR_IN_milliseconds);
            } else {
                console.log(`Next notification will be in ${Math.round((ONE_HOUR_IN_milliseconds - now.diff(listNotificationMoment)) / 1000 / 60)} minutes`);
                setTimeout(() => {
                    this.notify();
                    setInterval(this.notify.bind(this), ONE_HOUR_IN_milliseconds);
                }, ONE_HOUR_IN_milliseconds - now.diff(listNotificationMoment));
            }

        } else {
            this.notify();
            setInterval(this.notify.bind(this), ONE_HOUR_IN_milliseconds);
        }
    }

    notify() {

        const notification = new Notification("Time to stand up. We want you to live longer!", {
            icon: 'assets/images/icon.svg'
        });
        const nextNotificationIndex = this.props.notifications.length;
        notification.onclick = () => {
            window.open("https://draggarwal.files.wordpress.com/2012/06/office-stretches.jpg");
            this.props.toggle(nextNotificationIndex);
        };
        this.props.add();
    }

    componentWillReceiveProps(nextProps) {
        cookies.set('notifications', nextProps.notifications);
    }

    render() {
        const { notifications } = this.props;
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn colSpan="3" style={{textAlign: 'center'}}>
                            Office Stretch
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>#</TableHeaderColumn>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                        <TableHeaderColumn>Completed</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {notifications.map((notification, index) => {
                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{notification.moment}</TableRowColumn>
                                <TableRowColumn>
                                    {
                                        notification.completed ?
                                            <FontIcon className="material-icons">check</FontIcon> :
                                            <FontIcon className="material-icons">close</FontIcon>
                                    }
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

export default List

