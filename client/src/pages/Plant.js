import React, { Component } from 'react';
import { getPlantById, addLog } from '../utils/API';
import LogForm from '../components/LogForm'
import NavbarDropdown from '../components/NavbarDropdown';


export default class Plant extends React.Component {
   constructor(props) {
      super(props);
      this.handleLogChange = this.handleLogChange.bind(this);
      this.state = {
         plantId: this.props.match.params.id,
         specie: '',
         nickname: '',
         plantedDate: '',
         logs: [],
         newLogDate: '',
         newLogBody: '',
         newLogHeight: '',
         newLogOutput: '',
         newLogRain: '',
         newLogTemp: '',

      }
   }

   componentDidMount() {
      this.retrievePlantData();
   }

   retrievePlantData = () => {
      getPlantById(this.state.plantId)
         .then(({ data: dbPlantData}) => {

            console.log(dbPlantData)

            const dbPlantSpecie = dbPlantData.specie;
            const dbPlantNickname = dbPlantData.nickname;
            const dbPlantDate = dbPlantData.plantedDate;
            const dbPlantLogs = dbPlantData.logs;

            this.setState({
               specie: dbPlantSpecie,
               nickname: dbPlantNickname,
               plantedDate: dbPlantDate,
               logs: dbPlantLogs
            })
         })
   }

   handleLogChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      })
   };

   handleFormSubmitLog = event => {
      const newLog = {
         plantId: this.state.plantId,
         logDate: this.state.newLogDate,
         logBody: this.state.newLogBody,
         height: this.state.newLogHeight,
         output: this.state.newLogOutput,
         avgTemp: this.state.newLogTemp,
         rain: this.state.newLogRain
      };
      console.log(`newLog: ${JSON.stringify(newLog)}`)
      addLog(newLog)
         .then(this.retrievePlantData())

   }

   render() {
      return(
         <React.Fragment>
            <div className="container">
               <NavbarDropdown></NavbarDropdown>
               <LogForm
                  onLogChange={this.handleLogChange}
                  handleFormSubmitLog={this.handleFormSubmitLog}
                  newLogDate={this.state.newLogDate}
                  newLogBody={this.state.newLogBody}
                  newLogHeight={this.state.newLogHeight}
                  newLogOutput={this.state.newLogOutput}
                  ></LogForm>

                  <h1>{this.state.newLogBody}</h1>
            </div>

         </React.Fragment>
         
      
      )
   }
}