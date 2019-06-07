import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class PlantForm extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="plantName" sm={2}>Plant Name</Label>
          <Col sm={10}>
            <Input type="text" name="plantName" id="plantName" placeholder="Garden Tomato" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nickname" sm={2}>Nickname</Label>
          <Col sm={10}>
            <Input type="text" name="nickname" id="nickname" placeholder="Tomato #3" />
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
          />
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="exampleText" sm={2}>Text Area</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup>
       
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}