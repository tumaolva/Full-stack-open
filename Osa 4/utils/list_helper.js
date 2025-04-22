const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 0
    return blogs.reduce((blog1, blog2) => {
        return (blog1.likes > blog2.likes) 
        ? blog1 
        : blog2
    })
  }
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }

