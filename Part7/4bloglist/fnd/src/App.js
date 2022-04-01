import './index.css'
import styled from 'styled-components'

import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useMatch, useParams } from 'react-router-dom'

import { initBlogs, createBlog, upvoteBlog, blogRemover } from './reducers/blogReducer'
import { setNotification } from './reducers/NotifyReducer'
import { svdUser, clrUser, logUser } from './reducers/userReducer'
import { initUserList } from './reducers/userListReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserView from './components/UserView'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import Menu from './components/Menu'





const App = () => {
  const dispatch = useDispatch()
  
  let blogs = useSelector(st => st.blogs)
  const notification = useSelector(st => st.notification)
  const user = useSelector(st => st.user) 

  const blogFormRef = useRef()
 
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(svdUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUserList())
  }, [dispatch])

  const login = (username, password) => {
    dispatch(logUser({username, password})).catch(() => {
      notify('wrong username/password', 'alert')
    })
  }

  const logout = () => {
    dispatch(clrUser())
    notify('good bye!')
  }

  const create = (blog) => { 
    dispatch(createBlog(blog)).catch( error => {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    })
    notify(`a new blog '${blog.title}' by ${blog.author} added`)
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return notify("remove cancelled", 'alert')
    }
    return dispatch(blogRemover(toRemove))
  }

  const likeBlog = (id) => {
    const toLike = blogs.find(b => b.id === id)
    dispatch(upvoteBlog(toLike))
    notify(`you liked '${toLike.title}' by ${toLike.author}`)
  }

  const notify = (message, type='info') => {
    return dispatch(setNotification( {message, type}, 5))
  }

  if (user === null) {
    return <>
      <Notification notification={notification} />
      <LoginForm onLogin={login} />
    </>
  }

  const style = {
    marginTop: notification === null ? 60 : -10
  }

  return (
    <div>
      <Menu user={user} logout={logout} />
      <Notification notification={notification} />
      <Routes>
        <Route path="/user/:id" element={
          <SingleUser className='container' blogs={blogs} />
        } />

        <Route path="/blogs/:id" element={
          <SingleBlog style={style} className='container' like={likeBlog} />
        }
               
        />

        <Route path="user" element={
          <UserView className='container' />
        } />

        <Route path='/' element={
          <div className='container'>    
          <div id="home">
          <h1>Blogs</h1>  
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <NewBlogForm
              onCreate={create}
            />
          </Togglable>
          </div>
    
          <div id='blogs'>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          )
          }
          </div>
          </div>
        } />
      </Routes>
      
      
      
    </div>
  )
}

export default App