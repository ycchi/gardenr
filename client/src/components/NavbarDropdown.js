import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input,
Card
} from 'reactstrap';

export default class NavbarDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
   this.props.onZipcodeChange(e.target.value);
 }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
   const zipcode = this.props.zipcode;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/garden">gardenr</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                Welcome back {this.props.username}
                </DropdownToggle>
                <DropdownMenu right>
                  
                  
                  <Card>
                    <Form onSubmit={() => {
                       this.props.handleFormSubmit()
                    }}>
                     <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="zipcode" className="mr-sm-2">Garden Zipcode</Label>
                        <Input type="text" name="zipcode" id="zipcode" placeholder={zipcode} 
                        value={zipcode}
                        onChange={this.handleChange}  />
                     </FormGroup>
                     <Button type="submit">Update</Button>
                  </Form>
                </Card>


                  <DropdownItem divider />
                  <DropdownItem>
                     <NavLink href="http://localhost:5000/auth/logout">
                        Log Out
                     </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}