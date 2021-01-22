const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogList.length === 0 ? 0 : blogList.reduce(reducer, 0)
}

const mostBlogs = (blogList) => {  
  const lodashResult = _(blogList).countBy('author').entries().max()
  //console.log(lodashResult)
  return { author: lodashResult[0], blogs: lodashResult[1] }
}

const favoriteBlog = (blogList) => {
  return blogList.length === 0
    ? {}
    : blogList.reduce((max, blog) => (blog.likes > max.likes ? blog : max))
  //if(blogList.length === 0) return {}
  //return blogList.reduce((max, blog) => blog.likes > max.likes ? blog : max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
