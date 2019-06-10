import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { getPlantById, addLog } from '../utils/API';
import LogForm from '../components/LogForm'
import NavbarDropdown from '../components/NavbarDropdown';
import LogTable from '../components/LogTable'


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

                  
                  
                  <Table>
                  <thead>
                     <tr>
                        <th>Log Date</th>
                        <th>Rain</th>
                        <th>Temperature</th>
                        <th>Height (in)</th>
                        <th># of Fruits/Crops</th>
                        <th>Log</th>
                     </tr>
                  </thead>

                  <tbody>
                     
                     {!this.state.logs.length ? (
                     
                           <th>No Saved Logs yet..</th>
                        
                  ) : (
                     this.state.logs.map(log => {
                        return (
                           <LogTable 
                              logDate={log.logDate}
                              rain={log.rain}
                              temp={log.avgTemp}
                              height={log.height}
                              output={log.output}
                              logBody={log.logBody}
                              logId={log._id}
                              plantId={this.state.plantId}
                              retrievePlantData={this.retrievePlantData}
                           />
               
                        )
                     })
                  )}
                  </tbody>
                  
                  
               </Table>
            </div>

         </React.Fragment>
         
      
      )
   }
}