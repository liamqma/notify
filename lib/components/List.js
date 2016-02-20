import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Table from '../../node_modules/material-ui/lib/table/table';
import TableBody from '../../node_modules/material-ui/lib/table/table-body';
import TableHeader from '../../node_modules/material-ui/lib/table/table-header';
import TableHeaderColumn from '../../node_modules/material-ui/lib/table/table-header-column';
import TableRow from '../../node_modules/material-ui/lib/table/table-row';
import TableRowColumn from '../../node_modules/material-ui/lib/table/table-row-column';
import FontIcon from '../../node_modules/material-ui/lib/font-icon';

class List extends Component {
    render() {
        const notifications = this.props.notifications.filter((notification) => {
            return moment(notification.moment).isSame(moment(), 'day');
        });
        return (
            <div>
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
                                    <TableRowColumn>{moment(notification.moment).format('HH:mm')}</TableRowColumn>
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
            </div>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default List

