import { useState } from "react"
import { useField } from "../hooks"


const CreateNew = (props) => {
  const content = useField('text', 'content')
  const author = useField('text','author')
  const info = useField('text','info')

  

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const reset = (e) => {
    e.preventDefault()
    content.onChange(null)
    author.onChange(null)
    info.onChange(null)
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} id="form1">
        <div id="pt1">
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit" form="form1">create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew