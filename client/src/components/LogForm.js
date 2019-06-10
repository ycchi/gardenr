import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LogForm extends React.Component {

   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
   }

   // handlechange
   handleChange(e) {
      this.props.onLogChange(e)
   }

   render() {
      
    return (
      <Form onSubmit={()=> {
         this.props.handleFormSubmitLog()
      }}>
         <FormGroup row>
          <Label for="newLogDate" sm={2}>Log Date</Label>
          <Col sm={10}>
          <Input
            type="date"
            name="newLogDate"
            id="LogDate"
            placeholder="date placeholder"
            onChange={this.handleChange}
          />
          </Col>
        </FormGroup>


        <FormGroup row>
          <Label for="newLogHeight" sm={2}>Height (In)</Label>
          <Col sm={10}>
            <Input type="number" name="newLogHeight" id="LogHeight" placeholder="23"
            onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="newLogOutput" sm={2}> # of Fruits/Crops</Label>
          <Col sm={10}>
            <Input type="number" name="newLogOutput" id="output" placeholder="23"
            onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="newLogBody" sm={2}>Log</Label>
          <Col sm={10}>
            <Input type="textarea" name="newLogBody" id="LogBody" placeholder="Harvested very first tomatoes!"
            onChange={this.handleChange}/>
          </Col>
        </FormGroup>
       
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">Add Log</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}