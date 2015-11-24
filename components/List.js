import React, { Component, PropTypes } from 'react'
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const FontIcon = require('material-ui/lib/font-icon');
import {add} from '../actions/notification';

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

        const oneHour = 1000 * 60 * 60 * 1;
        const oneMinute = 1000 * 60;
        const oneSecond = 1000;

        this.notify();
        setInterval(this.notify.bind(this), oneHour);

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

    render() {
        const { notifications } = this.props;
        return (
            <Table>
                <TableHeader>
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
                <TableBody>
                    {notifications.map((notification, index) => {
                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>{notification.moment}</TableRowColumn>
                                <TableRowColumn>
                                    {
                                        notification.completed ?
                                            <FontIcon className="material-icons">check</FontIcon> : <FontIcon className="material-icons">close</FontIcon>
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

