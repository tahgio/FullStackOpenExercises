//import { useDispatch } from "react-redux"
import { newFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()
  const handleChange = (event) => {
    props.newFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

return (
  <div style={style}>
    filter <input onChange={handleChange} />
  </div>
  )
}

const ConnectedFilter = connect(
  null,
  { newFilter }
)(Filter)

export default ConnectedFilter
//export default Filter

