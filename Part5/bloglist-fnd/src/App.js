import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreationForm from './components/CreationForm'
import lgnService from './services/login'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errmsg, setErrmsg] = useState(null)
  const [msg, setMsg] = useState(null)



  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggeduser')
    if (loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandle = async (event) => {
    event.preventDefault()

    try {
      const user = await lgnService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggeduser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMsg('log in succesful')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrmsg('Wrong username/password')
      setTimeout(() => {
        setErrmsg(null)
      }, 5000)
    }
  }


  const addBlog = async (object) => {
    try {
      let a = await blogService.create(object)
      setMsg(`new blog ${object.title} succesfully created`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
      blogFormRef.current.toggler()
      setBlogs(blogs.concat({ ...object, user:{ id:a.user } }))
      console.log(a)
    //document.location.reload()
    } catch (exception) {
      setErrmsg('creation invalid')
      setTimeout(() => {
        setErrmsg(null)
      }, 5000)
    }
  }

  const clear = () => {
    window.localStorage.removeItem('loggeduser')
    return document.location.reload()
  }

  const logout = () => (
    <div>
      <button id='logout-btn' onClick={() => clear()}>logout</button>
    </div>
  )


  const likeHandle = (blog) => {
    const updatedb = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.update(blog.id, updatedb)
      .then(setBlogs(blogs.map((e) => {
        if (e.id !== blog.id) {
          return e
        } else {
          e.likes++
          return e
        }


      }
      )))
  }

  const delHandle = (blog) => {
    if (window.confirm(`Do you really want to delet ${blog.title}?`)){
      let id = blog.id
      blogService.del(id)
        .then(setBlogs(blogs.filter((e) => {
          if (e.id !== id) {
            return true
          }else {
            return false}
        }
        )))}
  }

  const blogStyle = {
    width: '90%',
    border: '1px solid',
    padding: 3,
    margin: 5,
    display: 'inline-flex',
    gap: 10
  }

  return (
    <div>
      {errmsg === null
        ? null
        : <p className='err'>{errmsg}</p>
      }
      {msg === null
        ? null
        : <p className='msg'>{msg}</p>
      }
      { user === null
        ? <LoginForm onSubmit={loginHandle}
          vu={username} chu={({ target }) => setUsername(target.value) }
          vp={password} chp={({ target }) => setPassword(target.value)} />
        : (
          <div>
            <div>{user.name} logged in {logout()}</div>
            <h1>blogs</h1>
            <Togglable blabel="new note" b2label="hide" ref={blogFormRef} >
              <CreationForm createB={addBlog} />
            </ Togglable>
            <div className='test'>
              {blogs.sort((a,b) => b.likes - a.likes)
                .map(blog =>
                  <div key={`${blog.id}a`} style={blogStyle}>
                    <Blog key={blog.id}
                      blog={blog}
                      lH={() => likeHandle(blog)}
                      dH={() => delHandle(blog)}
                      user={user}
                    />
                  </div>)}
            </div>
          </div>
        )}
    </div>
  )
}

export default App