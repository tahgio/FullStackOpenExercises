import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, lH, dH, user }) => {

  return (
    <div className='blogsdivs'>
      <p className='titnaut'> <em>{blog.author}</em> {blog.title}</p>
      <Togglable blabel="view" b2label="hide">
        <p><strong >Blog: </strong>{blog.title} <strong>Author: </strong>{blog.author}</p>
        <p className='url'><strong>Url: </strong>{blog.url} <strong>Likes: </strong> {blog.likes} <button onClick={lH}>like</button></p>
        { user.user.id === blog.user.id ? <button onClick={dH}>remove</button> : null  }
      </Togglable>
    </div>
  )}

export default Blog