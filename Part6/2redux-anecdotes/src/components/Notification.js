//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  //const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: -15,
  }
  return (
    <div style={notification ? style : {display: 'none'}}>
      {notification}
    </div>
  )
}


const MapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNot = connect(MapStateToProps)(Notification)
export default ConnectedNot
//export default Notification