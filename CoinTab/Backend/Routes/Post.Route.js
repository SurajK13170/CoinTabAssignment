const express = require("express")
const PostRouter = express.Router()
const {Postmodel} = require("../Model/Post.Model")

PostRouter.get('/', async (req, res) => {
    try {
      const posts = await Postmodel.find();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Route to add a new post
  PostRouter.post('/', async (req, res) => {
    try {
      const { body } = req
      if(Array.isArray(body)){
        let posts = await Promise.all(body.map(post => Postmodel.create(post)))
        res.status(201).json(posts);
      }else{
        let post = await Postmodel.create(body)
        res.status(201).json(post);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  PostRouter.get('/:userId', async (req, res) => {
    try{
      const post = await Postmodel.findOne({userId: req.params.userId})
      res.status(201).json(post);
    }catch(e){
      res.status(404).json({ error: 'Not found' });
    }
  })
  
  module.exports = {PostRouter}