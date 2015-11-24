import React, { Component, PropTypes } from 'react'
import {add} from '../actions/notification';

class List extends Component {
    render() {
        const { notifications } = this.props
        return (
            <table>
                <tbody>
                {notifications.map((notification, index) => {
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{notification.moment.format()}</td>
                            <td>{notification.completed.toString()}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired,
    add: PropTypes.func.isRequired
};

export default List

