import React from 'react';
import { Table, Button } from 'reactstrap';
import { removeLog } from '../utils/API';

export default class LogTable extends React.Component {

   constructor(props) {
      super(props);
      this.handleRemoveLog = this.handleRemoveLog.bind(this);
   }

   handleRemoveLog = (plantId, logId) => {
      console.log(`RUNNING: handleRemoveLog`);
      console.log(`plantId: ${plantId}`);
      console.log(`logId: ${logId}`);
      removeLog(plantId, logId)
         .then(this.props.retrievePlantData())
         .catch(err => console.log(err))
   }

  render() {
    return (
      <tr>
            <th scope="row">{this.props.logDate}</th>
            <td>{!this.props.rain ? ("N/A"):(this.props.rain)}</td>
            <td>{!this.props.temp ? ("N/A"):(this.props.temp)}</td>
            <td>{!this.props.height ? ("N/A"):(this.props.height)}</td>
            <td>{!this.props.output ? ("N/A"):(this.props.output)}</td>
            <td>{!this.props.logBody ? ("N/A"):(this.props.logBody)}</td>
            <td><Button onClick={()=>this.handleRemoveLog(this.props.plantId, this.props.logId)}>Delete Log</Button></td>
      </tr>
    );
  }
}