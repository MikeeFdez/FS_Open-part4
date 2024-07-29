const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'noName', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const response = await api.get('/api/users')
    const usersAtStart = response.body.length

    const newUser = {
      username: 'ironman',
      name: "Tony Stark",
      password: 'supersecret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseAtEnd = await api.get('/api/users')
    const usersAtEnd = responseAtEnd.body.length
    assert.strictEqual(usersAtEnd, usersAtStart + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})

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