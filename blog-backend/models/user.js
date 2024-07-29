const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
  name: {
      type: String,
      required: true,
      minlength: 4
    },
  passwordHash: {
    type: String,
    // required: true,
    minlength: 4
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //Como passwordhash no debe mostrarse, lo eliminamos también:
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)