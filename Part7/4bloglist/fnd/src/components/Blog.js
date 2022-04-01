import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
  

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  
  const style = {
    padding: "8px 5px",
    margin: 5,
    border: "solid 2px #150658"
  }

  return (
    <div style={style} className='blog'>
      <Link to={`/blogs/${blog.id}`} >
        {blog.title} by {blog.author}
      </Link>      
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog