const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogList.length === 0
    ? 0
    : blogList.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}