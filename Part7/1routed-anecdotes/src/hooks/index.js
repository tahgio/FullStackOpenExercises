import { useState } from "react"

export const useField = (type, name) => {
  const [value, setValue] = useState('')
  const onChange = event => {
    event 
    ? setValue(event.target.value)
    : setValue('')
  }

  return {
    type,
    name,
    value,
    onChange
  }
}