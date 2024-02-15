// App.js
import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import PostPage from './Components/Post';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:userId" element={<PostPage/>} />
    </Routes>
  );
}

export default App;
