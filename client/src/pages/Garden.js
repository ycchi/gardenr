import React, { Component } from 'react';
import { getUserData, updateZipcode } from '../utils/API';
// import NavBar from '../components/NavBar';
import NavbarDropdown from '../components/NavbarDropdown';


class Garden extends Component {

   

   constructor(props) {
      super(props);
      this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
      this.state = {
         username: '',
         plants: [],
         zipcode: ''
      };
    }
   
   handleZipcodeChange(zipcode) {
      this.setState({zipcode});
    }

   componentDidMount() {
      this.retrieveUserData();
   }

   retrieveUserData = () => {
      getUserData()
         .then(({ data: dbUserData }) => {
            const dbUserName = dbUserData.username;
            const dbUserZipcode = dbUserData.zipcode;
            this.setState({ 
               username: dbUserName, 
               zipcode: dbUserZipcode 
            });
         })
   }

   handleFormSubmit = event => {
      console.log(`RUNNING: handleFormSubmit`)
      // event.preventDefault();
      const zipcode = this.state.zipcode

      updateZipcode(zipcode)
         //.then(this.retrieveUserData())
         .then(({ data: dbUserData }) => {
            const newZipcode = dbUserData.zipcode;
            this.setState({
               zipcode: newZipcode
            })
         })
   }

   render() {
      return (
         <React.Fragment>
            <div className="container">
            <NavbarDropdown username={this.state.username}
            onZipcodeChange={this.handleZipcodeChange}
            handleFormSubmit={this.handleFormSubmit}
            zipcode={this.state.zipcode}
            />
            <h1>THIS IS GARDEN PAGE</h1>
            
            <h1>Username: {this.state.username}</h1>
            <h1>Zipcode: {this.state.zipcode}</h1>
            </div>
            
            
            
         </React.Fragment>
      )
   }
};

export default Garden;