import { useState, useImperativeHandle, forwardRef } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: #08031f;
  color: aliceblue;
  font-family: Ubuntu, sans-serif;
  font-weight: 300;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid aliceblue;
  border-radius: 5px;
`

const CancelButton = styled.button`
  background: aliceblue;
  color: #08031f;
  font-family: Ubuntu, sans-serif;
  font-weight: 300;
  font-size: 1em;
  padding: 0.25em 3.4em;
  border: 2px solid #08031f;
  border-radius: 5px;
`

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <CancelButton onClick={toggleVisibility}>cancel</CancelButton>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable