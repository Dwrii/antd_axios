import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Login1 from './components/Login1';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login1 />} />
        <Route path ="/home" element={<Home />} />
        <Route path="/" element={<Login1 />} />  // Set Login1 as the default entry component
      </Routes>
    </Router>
  );
}

export default App;
