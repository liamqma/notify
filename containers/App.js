import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../components/List'
import * as NotificationActions from '../actions/notification'

function mapStateToProps(state) {
    return {
        notifications: state.notification
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(NotificationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
