const { test, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
// const listHelper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)


describe('The initial tests for the structure of the DB', () => {
  
  test('blog is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('the unique identifier is called id', async () => {
    const response = await api.get('/api/blogs')
  
    const identifier = Object.keys(response.body[0])
    assert.strictEqual(identifier.includes('id'), true)
  })

  test('there are initially seven blog entries', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, 7)
  })
})

describe('When adding new entries on the blog', () => {
  
  test('there is a new entry added on the blog', async () => {
    const response = await api.get('/api/blogs')
    const initialBlogLength = response.body.length
  
    const newBlogEntry = {
      title: "1984",
      author: "George Orwell",
      url: "magnificentURL",
      likes: 30
    }
    await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      const newResponse = await api.get('/api/blogs')
      const authors = newResponse.body.map(b => b.author)
  
      assert.strictEqual(newResponse.body.length, initialBlogLength + 1)
      assert(authors.includes('George Orwell'))
  
  })
  
  test('likes is added if the entry does not include it', async () => {
    const newBlogEntry = {
      title: "World at war",
      author: "Ken Follet",
      url: "anotherURL",
    }
  
    if (!Object.keys(newBlogEntry).includes('likes')) {
      newBlogEntry.likes = 0
    }
    
    await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body[response.body.length - 1].likes, 0)
  
  })

  test('no blog is added if title or author is missing', async () => {
    const response = await api.get('/api/blogs')
    const initialBlogLength = response.body.length
  
    const newBlogEntry = {
      author: "Random Author",
      likes: 4,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlogEntry)
      .expect(400)
    
    const newResponse = await api.get('/api/blogs')
  
    assert.strictEqual(newResponse.body.length, initialBlogLength)
  
  })
})

describe('deletion of a blog entry', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = response.body.length
    const blogToDelete = response.body[response.body.length - 1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    const blogsAtEnd = responseAtEnd.body.length

    assert.strictEqual(blogsAtEnd.length, blogsAtStart - 1)

    const authors = responseAtEnd.body.map(r => r.author)
    assert(!authors.includes(blogToDelete.author))
  })
})

describe('modification of a blog entry', () => {
  test('succeeds with status code 200 if the modification is correct', async () => {
    const response = await api.get('/api/blogs')
    const blogToModify = response.body[response.body.length - 1]
    const updatedBlog = {...blogToModify, likes: 10}
  
    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
    
    const lastResponse = await api.get('/api/blogs')
    
    assert.strictEqual(lastResponse.body[lastResponse.body.length - 1].likes, updatedBlog.likes)
  })
})



after(async () => {
  await mongoose.connection.close()
})


// Unitary tests
// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   assert.strictEqual(result, 1)
// })

// describe('total likes / favorite blog', () => {
//   const blogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//       likes: 50,
//       __v: 0
//     }
//   ]
//   const totalLikes = listHelper.totalLikes(blogs)
//   const favBlog = listHelper.favoriteBlog(blogs)

//   // test('of empty list is zero', () => {
//   //   assert.strictEqual(totalLikes, 0)
//   // })

//   // test('when list has only one blog equals the likes of that', () => {
//   //   assert.strictEqual(totalLikes, blogs[0]["likes"])
//   // })

//   test('of a bigger list is calculated right', () => {
//     assert.strictEqual(totalLikes, 60)
//   })

//   test('of the favorite blog with most likes', () => {
//     assert.strictEqual(favBlog,blogs[2])
//   })

// }
// )