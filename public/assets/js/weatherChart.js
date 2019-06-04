
let labels = [];
let avgTemp = [];

let rainArr = [];


function renderChart() {
   var ctx = document.getElementById("myChart").getContext('2d');
   var mixChart = new Chart(ctx, {
   type: 'bar',
   data: {
       labels: labels,
       datasets: [
           {
               type: 'line',
               label: "Temperature",
               data: avgTemp,
               borderColor: 'rgba(191, 63, 63, 1)',
               backgroundColor: 'rgba(0, 0, 0, 0)',
               yAxisID: 'temperature',
           },
           {
               label: "Rain",
               data: rainArr,
               borderColor: 'rgba(0, 0, 0, 0)',
               backgroundColor: 'rgba(75, 192, 192, 1)',
               yAxisID: 'rain',
           }
       ]
   },
   options: {
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
       },
   }
});
}




function getChartData() {


   $("#loadingMessage").html('<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" srcset="">');
   $.ajax({
       url: "/api/weather",
       success: (result) => {
         console.log(`result: ${JSON.stringify(result)}`)


           $("#loadingMessage").html("");
           
         //   data.push(result.thisWeek);
         //   data.push(result.lastWeek);
           labels = result.dateRange;
           avgTemp = result.avgTemp;
           rainArr = result.rainArr;
           renderChart(avgTemp, rainArr, labels);
       },
       error: function (err) {
           $("#loadingMessage").html("Error");
       }
   });
}



$(document).ready(getChartData());
