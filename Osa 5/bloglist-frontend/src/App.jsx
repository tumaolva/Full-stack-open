import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('') 
   const [password, setPassword] = useState('') 
   const [user, setUser] = useState(null)
   const [newTitle, setNewTitle] = useState('')
   const [newAuthor, setNewAuthor] = useState('')
   const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')


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

const addBlog = async (event) => {
  event.preventDefault()
  const blogObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  }
  try {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setMessage(`blogi ${returnedBlog.title} lisätty onnistuneesti`)
    setMessageType('success')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  } catch (error) {
    setMessageType('error')
    setMessage(error.response.data.error)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
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
          <h2>blogs</h2>
          <Notification message={message} type={messageType} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <BlogForm 
             addBlog={addBlog}
             title={newTitle}
             author={newAuthor}
             url={newUrl}
             handleTitleChange={({ target }) => setNewTitle(target.value)}
             handleAuthorChange={({ target }) => setNewAuthor(target.value)}
             handleUrlChange={({ target }) => setNewUrl(target.value)}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>        
      )}
      
    </div>
  )
}

export default App