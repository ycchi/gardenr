import React, { Component } from 'react';
import LandingCarousel from '../components/LandingCarousel';
import Hero from '../components/Hero';

class Landing extends Component {

   render() {
      return (
         <React.Fragment>
            
            <div className="carousel-wrapper">
            <LandingCarousel />
            </div>
            <Hero />

            
            
            
            
         </React.Fragment>
      )
   }
};

export default Landing;