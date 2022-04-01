import { useState } from 'react'
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
const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap:2px;
`

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <FormDiv>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
            placeholder='title of the blog'
          />
        </FormDiv>
        <FormDiv>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
            placeholder='author of the blog'
          />
        </FormDiv>
        <FormDiv>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
            placeholder='url of the blog'
          />
        </FormDiv>
        <Button id='create-button' type='submit'>
          create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlogForm