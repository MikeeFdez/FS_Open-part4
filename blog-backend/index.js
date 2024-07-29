const app = require('./app') // la aplicación Express real
const config = require('./utils/config')
const logger = require('./utils/logger')

// const PORT = 3003
// const blogs = [
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//     likes: 5,
//     __v: 0
//   },
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//     likes: 50,
//     __v: 0
//   },
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//     likes: 10,
//     __v: 0
//   }
// ]

// const prueba = new Array(blogs.length).fill(blogs.map(objeto => objeto.likes))[0]
// const indexMaxLikes = prueba.indexOf(Math.max(...prueba))
// const Blog = require('./models/blog')
// const initialBlogs = Blog.find({})
//   .then(result => {
//     result.forEach(b => {
//       console.log(b)
//     })
//   })

// const blogEntry = {
//   title: "Disertaciones",
//   author: "Epicteto",
//   url: "nonExistingUrl",
// }

// newBlogEntry = {...blogEntry, author: "El hijo de Epicteto"}

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  // console.log(blogs[blogs.length-1].likes)
  // console.log(Object.keys(newBlogEntry))
  // listWithOneBlog.forEach(objeto => console.log(objeto.likes))
})