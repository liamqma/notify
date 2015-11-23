import React, { Component, PropTypes } from 'react'

class List extends Component {
    render() {
        const { notifications } = this.props
        return (
            <table>
                <tbody>
                {notifications.map((notification, index) => {
                    return (
                        <tr>
                            <td>{index}</td>
                            <td>{notification.moment.format()}</td>
                            <td>Input box</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default List

