import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => { 
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url  
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              value={title}
             onChange={event => setTitle(event.target.value)}
              name="Title"
            />
          </div>
          <div>
            author:
            <input
              value={author}
              onChange={event => setAuthor(event.target.value)}
              name="Author"
            />
          </div>
          <div>
            url:
            <input
              value={url}
              onChange={event => setUrl(event.target.value)}
              name="Url"
            />
          </div>
          <button type="submit">save</button>
        </form>
      </div>
    )
}

export default BlogForm