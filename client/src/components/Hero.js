
import React from 'react';
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Hero = (props) => {
  return (
    <div>
      <Card className="hero">
        <CardBody>
          <CardTitle className="display-1">Gardenr</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Login with Google</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Hero;