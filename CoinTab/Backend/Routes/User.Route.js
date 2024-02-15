const express = require("express")
const UserRouter = express.Router()
const {Usermodel} = require("../Model/User.Model");
const { Postmodel } = require("../Model/Post.Model");

UserRouter.get('/', async (req, res) => {
    try {
      const users = await Usermodel.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  UserRouter.post('/', async (req, res) => {
    try {
      const newUser = await Usermodel.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = {UserRouter}