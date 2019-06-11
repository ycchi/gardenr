
import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: '/img/carouselBackground/1.jpg',
    altText: 'sprouts',
    caption: ''
  },
  {
    src: '/img/carouselBackground/2.jpg',
    altText: 'water',
    caption: ''
  },
  {
    src: '/img/carouselBackground/3.jpg',
    altText: 'harvest',
    caption: ''
  }
];

const LandingCarousel = () => <UncontrolledCarousel items={items} />;


export default LandingCarousel;