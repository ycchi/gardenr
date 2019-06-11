
import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Hero extends Component {
  render() {
    return (
      <div>
        <Card className="hero">
          <CardBody>
            <CardTitle className="display-1">Gardenr</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button href="http://localhost:5000/auth/google">Login with Google</Button>
            
  
        
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Hero;