import { useState, forwardRef, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggler = () => { setVisible(!visible) }

  useImperativeHandle(ref, () => {
    return {
      toggler
    }
  })
  Togglable.propTypes = {
    blabel: PropTypes.string.isRequired,
    b2label: PropTypes.string.isRequired
  }
  return (
    <div>
      <div style={hidden} className='tgcontent'>
        <button onClick={toggler}>
          {props.blabel}
        </button>
      </div>
      <div style={show} className='tgchildcontent'>
        {props.children}
        <button onClick={toggler}>{props.b2label}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable