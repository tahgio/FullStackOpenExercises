import React from 'react'
import { useState } from 'react'

const Form = (props) => {
  return (
    <div>
      {props.text}
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </div>)
}


const CreationForm = ({ createB }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createB({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const tChange = (event) => { setTitle(event.target.value) }
  const aChange = (event) => { setAuthor(event.target.value) }
  const uChange = (event) => { setUrl(event.target.value) }

  return (
    <div className='formdiva'>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog} id="form2">
        <Form id='crtitle' text="title: " type="text" value={title}
          onChange={tChange}
        />
        <Form id='crauthor' text="author: " type="text" value={author}
          onChange={aChange}
        />
        <Form id='crurl' text="url: " type="text" value={url}
          onChange={uChange}
        />
      </form>
      <button className="button" type="submit" form="form2" >save</button>
    </div>
  )
}


export default CreationForm