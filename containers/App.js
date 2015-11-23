import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../components/List'
import * as CounterActions from '../actions/counter'
import * as NotificationActions from '../actions/notification'

function mapStateToProps(state) {
    return {
        counter: state.counter,
        notifications: state.notification
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, CounterActions, NotificationActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
