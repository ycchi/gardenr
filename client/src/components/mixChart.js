import React from 'react';
import {Bar} from 'react-chartjs-2';



export default class MixChart extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         weatherData: props.weatherData
      }
   }


   render() {
      return (
         <React.Fragment>
            <h2 className="display-3">Rain and Temperature</h2>
            <Bar
               data={{
                  labels: this.state.weatherData.dateRange,
                  datasets: [
                     {
                     type: 'line',
                     label: "Temperature",
                     data: this.state.weatherData.avgTemp,
                     borderColor: 'rgba(191, 63, 63, 1)',
                     backgroundColor: 'rgba(0, 0, 0, 0)',
                     yAxisID: 'temperature',
                     },
                     {
                     label: "Rain",
                     data: this.state.weatherData.rainArr,
                     borderColor: 'rgba(0, 0, 0, 0)',
                     backgroundColor: 'rgba(75, 192, 192, 1)',
                     yAxisID: 'rain',
                     }
                  ]
               }}
               options={{
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