import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class PlantForm extends React.Component {

   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(e) {
      this.props.onNewPlantChange(e.target.value)
   }

   render() {
      const plantName = this.props.newPlantName;
      const nickname = this.props.newPlantNickname;
      const date = this.props.newPlantDate;
    return (
      <Form onSubmit={()=> {
         this.props.handleFormSubmitNewPlant()
      }}>
        <FormGroup row>
          <Label for="plantName" sm={2}>Plant Name</Label>
          <Col sm={10}>
            <Input type="text" name="plantName" id="plantName" placeholder="Garden Tomato" value={plantName} 
            onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nickname" sm={2}>Nickname</Label>
          <Col sm={10}>
            <Input type="text" name="nickname" id="nickname" placeholder="Tomato #3" value={nickname}
            onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="PlantedDate" sm={2}>Planted Date</Label>
          <Col sm={10}>
          <Input
            type="date"
            name="date"
            id="PlantedDate"
            placeholder="date placeholder"
            value={date}
            onChange={this.handleChange}
          />
          </Col>
        </FormGroup>
        
        {/* <FormGroup row>
          <Label for="exampleText" sm={2}>Text Area</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup> */}
       
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">Add Plant</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}