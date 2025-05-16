const BlogForm = ({addBlog, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange}) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        value={title}
        onChange={handleTitleChange}
        name="Title"
      />
    </div>
    <div>
      author:
      <input
        value={author}
        onChange={handleAuthorChange}
        name="Author"
      />
    </div>
    <div>
      url:
      <input
        value={url}
        onChange={handleUrlChange}
        name="Url"
      />
    </div>
    <button type="submit">save</button>
  </form>
)

export default BlogForm