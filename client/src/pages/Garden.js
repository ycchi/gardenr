import React, { Component } from 'react';
import { getUserData, updateZipcode, addPlant, removePlant } from '../utils/API';
// import NavBar from '../components/NavBar';
import NavbarDropdown from '../components/NavbarDropdown';
import PlantCard from '../components/PlantCard';
import PlantForm from '../components/PlantForm';
import { Row, Col, Button } from 'reactstrap';


class Garden extends Component {

   constructor(props) {
      super(props);
      this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
      this.handleNewPlantChange = this.handleNewPlantChange.bind(this);
      this.state = {
         username: '',
         plants: [],
         zipcode: '',
         isHidden: true,
         newPlantName: '',
         newPlantNickname: '',
         newPlantDate: '',

      };
    }
   
   // Show / Hide input form
   toggleHidden () {
      this.setState({
         isHidden: !this.state.isHidden
      })
   }

 

   componentDidMount() {
      this.retrieveUserData();
   }

   retrieveUserData = () => {
      getUserData()
         .then(({ data: dbUserData }) => {
            const dbUserName = dbUserData.username;
            const dbUserZipcode = dbUserData.zipcode;
            const dbPlants = dbUserData.plants;
            
            console.log(`dbUserData: ${JSON.stringify(dbUserData)}`)

            this.setState({ 
               username: dbUserName, 
               zipcode: dbUserZipcode,
               plants: dbPlants
            });
         })
   }

   handleZipcodeChange(zipcode) {
      this.setState({
         zipcode: zipcode});
   }

   handleFormSubmitZipcode = event => {
      console.log(`RUNNING: handleFormSubmit`)
      // event.preventDefault();
      const zipcode = {
         zipcode: this.state.zipcode
      };

      // axios 'PUT' /api/user
      updateZipcode(zipcode)
         //.then(this.retrieveUserData())
         .then(({ data: dbUserData }) => {
            const newZipcode = dbUserData.zipcode;
            this.setState({
               zipcode: newZipcode
            })
         })
   }


////////// handle here
   handleNewPlantChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

   handleFormSubmitNewPlant = event => {
      const newPlant = {
         specie: this.state.newPlantName,
         nickname: this.state.newPlantNickname,
         plantedDate: this.state.newPlantDate
      }

      console.log(`handleFormSubmitNewPlant: ${newPlant}`)
      addPlant(newPlant)
         .then(this.retrieveUserData())
   }

   handleRemovePlant = plantId => {
      console.log(`RUNNING: handleRemovePlant`);
      removePlant(plantId)
         // .then(this.retrieveUserData())
         .catch(err => console.log(err))
   }



   render() {
      return (
         <React.Fragment>
            <div className="container">



            <NavbarDropdown 
            username={this.state.username}
            onZipcodeChange={this.handleZipcodeChange}
            handleFormSubmitZipcode={this.handleFormSubmitZipcode}
            zipcode={this.state.zipcode}
            />





            <h1>THIS IS GARDEN PAGE</h1>
            <h1>Username: {this.state.username}</h1>
            <h1>Zipcode: {this.state.zipcode}</h1>
            
            <Row>
            <Col>
            <Button onClick={this.toggleHidden.bind(this)}> click to show PlantForm</Button>

            {!this.state.isHidden && <PlantForm 
            onNewPlantChange={this.handleNewPlantChange}
            handleFormSubmitNewPlant={this.handleFormSubmitNewPlant}
            newPlantName={this.state.newPlantName}
            newPlantNickname={this.state.newPlantNickname}
            newPlantDate={this.state.newPlantDate}
            />}

            {!this.state.plants.length ? (
               <h2 className="text-center">No saved plants, yet.</h2>
            ) : (
               this.state.plants.map(plant => {
                  return (
                     <PlantCard 
                        specie={plant.specie}
                        nickname={plant.nickname}
                        removePlant={this.handleRemovePlant}
                        plantId={plant._id}
                        retrieveUserData={this.retrieveUserData}
                        />

                  )
               })
            )}
            
            </Col>
            </Row>

            </div>
            
            
            
         </React.Fragment>
      )
   }
};

export default Garden;