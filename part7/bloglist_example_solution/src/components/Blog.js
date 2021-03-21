import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const Blog = ({ blogs, blog, handleLike, handleRemove, own, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const id = useParams().id
  const label = visible ? 'hide' : 'view'
  if (blogs) {
    const blog = blogs.find((u) => u.id === String(id))
    return (
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => handleLike(blog.id)}>like</button>
        {user === blog.user.username && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
    )
  }
  return (
    <div style={blogStyle} className="blog">
      <div>
        <i>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </i>{' '}
        by {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   own: PropTypes.bool.isRequired,
// }

export default Blog
