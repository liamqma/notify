import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FontIcon from 'material-ui/lib/font-icon';

class List extends Component {
    render() {
        const { notifications } = this.props;
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
                                    <TableRowColumn>{moment(notification.moment).format('DD-MM-YYYY HH:mm')}</TableRowColumn>
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

