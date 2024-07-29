const Blog = require('../models/blog')

const dummy = (blogArray) => {
    return 1
  }

const totalLikes = (blogArray) => {
  return blogArray.length === 0
    ? 0
    : blogArray.map(b => b.likes).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const favoriteBlog = (blogArray) => {
  const arrayOfLikes = new Array(blogArray.length).fill(blogArray.map(b => b.likes))[0]
  const indexMaxLikes = arrayOfLikes.indexOf(Math.max(...arrayOfLikes))

  return blogArray[indexMaxLikes]
}

  
module.exports = {
  dummy, totalLikes, favoriteBlog
}