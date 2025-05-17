import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowBlogDetails(!showBlogDetails)}>
          {showBlogDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showBlogDetails && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={() => onLike(blog.id)}>like</button></div>
          <div>added by {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog