const mongoose = require("mongoose")
const postSchema = mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      }
})

const Postmodel = mongoose.model('Post', postSchema)
module.exports = { Postmodel }