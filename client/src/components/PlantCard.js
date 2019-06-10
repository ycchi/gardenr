import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { removePlant } from '../utils/API';


export default class PlantCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemovePlant = this.handleRemovePlant.bind(this)
  }

  handleRemovePlant = (plantId) => {
    console.log(`RUNNING: handleRemovePlant`);
    console.log(`plantId: ${plantId}`);
    removePlant(plantId)
       .then(this.props.retrieveUserData())
       .catch(err => console.log(err)) 
  }


  render () {
    return(
    <div>
      <Card>
        {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
        <CardBody>
          <CardTitle>{this.props.nickname}</CardTitle>
          <CardSubtitle>{this.props.specie}</CardSubtitle>
          <CardText></CardText>
          <Button><Link to={`/plant/${this.props.plantId}`}>View Logs</Link></Button>
          <Button onClick={()=>this.handleRemovePlant(this.props.plantId)}>Remove</Button>
        </CardBody>
      </Card>
    </div>
    )
  }
};

