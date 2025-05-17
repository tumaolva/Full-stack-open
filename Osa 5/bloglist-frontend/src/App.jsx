import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('') 
   const [password, setPassword] = useState('') 
   const [user, setUser] = useState(null)
  //  const [newTitle, setNewTitle] = useState('')
  //  const [newAuthor, setNewAuthor] = useState('')
  //  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

 const handleLogin = async (event) => {
    event.preventDefault()
    console.log('kirjaudutaan sisään', username, password)

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessageType('error')
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
}

const handleLike = async (id) => {
  const blogToLike = blogs.find(b => b.id === id)
  const updatedBlog = {
    ...blogToLike,
    likes: blogToLike.likes + 1,
    user: blogToLike.user.id || blogToLike.user // send only id
  }
  const returnedBlog = await blogService.update(id, updatedBlog)
  setBlogs(blogs.map(b => b.id !== id ? b : { ...returnedBlog, user: blogToLike.user }))
}

const addBlog =  (blogObject) => {
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessageType('success')
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setMessageType('error')
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }
  return (
    <div>     
      {!user && (
        <div>
        <h2>log in to application</h2>
        <Notification message={message} type={messageType} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        </div>
      )}
      {user && (
        <div>
          <div>
          <h1>Blogs</h1>
          <Notification message={message} type={messageType} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          </div>
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <h2>create new blog</h2>
             <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
          <h2>list of blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} onLike={handleLike} />
          )}
        </div>        
      )}
      
    </div>
  )
}

export default App