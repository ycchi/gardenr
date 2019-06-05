import React, { Component } from 'react';
import LandingCarousel from '../components/LandingCarousel';
import Hero from '../components/Hero';

class Landing extends Component {

   render() {
      return (
         <React.Fragment>
            <div className="landing-wrapper">
            <LandingCarousel />
            <Hero />
            </div>
            
            
         </React.Fragment>
      )
   }
};

export default Landing;