import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navbar from '../src/components/navbar/Navbar'
import LandingCarousel from './components/carousel/carousel'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar username="Young Chi" />
        <LandingCarousel />
      </div>
      
    </Router>
  );
}

export default App;
