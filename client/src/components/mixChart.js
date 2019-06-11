import React from 'react';
import {Bar} from 'react-chartjs-2';



export default class MixChart extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // setState??
         weatherData: this.props.weatherData
      }
   }


   render() {
      return (
         <React.Fragment>
            
            <p className="lead">Today is {this.props.weatherData.dateRange[6]}.</p>
            <p className="lead"> In the past 7 days, average temperature is  {this.props.weatherData.avgTempWeek} Fahrenheit, and total rain fall accumulated {this.props.weatherData.rainSum} inches. </p>

            {(parseInt(this.props.weatherData.rainTotal) < 1) ? 
            (<p className="lead">Your garden needs {1 - this.props.weatherData.rainTotal} inches of water today.</p>) :
            (<p className="lead">Your garden does not need water today</p>) 
            }

            <Bar
               data={{
                  labels: this.props.weatherData.dateRange,
                  datasets: [
                     {
                     type: 'line',
                     label: "Temperature",
                     data: this.props.weatherData.avgTemp,
                     fill: false,
                     borderColor: 'rgba(191, 63, 63, 1)',
                     backgroundColor: 'rgba(0, 0, 0, 0)',
                     yAxisID: 'temperature',
                     },
                     {
                     label: "Rain",
                     data: this.props.weatherData.rainArr,
                     borderColor: 'rgba(0, 0, 0, 0)',
                     backgroundColor: 'rgba(75, 192, 192, 1)',
                     yAxisID: 'rain',
                     }
                  ]
               }}
               options={{
                  responsive: true,
                  scales: {
                     yAxes: [
                         {
                             id: "temperature",
                             ticks: {
                                 beginAtZero: false,
                             },
                             scaleLabel: {
                                 display: true,
                                 labelString: 'Temperature (F)'
                               }
                         },
                         {
                             id: "rain",
                             position: 'right',
                             ticks: {
                                 beginAtZero: true,
                             },
                             scaleLabel: {
                                 display: true,
                                 labelString: 'Rain (Inches)'
                               }
                         },
                     ]
                 }
               }}
            />
         </React.Fragment>
      )
   }

}