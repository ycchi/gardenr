import React, { Component } from 'react';
import { getUserData } from '../utils/API';
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
            this.setState({ username: dbUserName })
         })
   }

   render() {
      return (
         <React.Fragment>
            <div className="container">
            <NavbarDropdown username={this.state.username}
            onZipcodeChange={this.handleZipcodeChange}/>
            <h1>THIS IS GARDEN PAGE</h1>
            
            <h1>Username: {this.state.username}</h1>
            </div>
            
            
            
         </React.Fragment>
      )
   }
};

export default Garden;