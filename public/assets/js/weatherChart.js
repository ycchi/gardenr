
var labels = [
   "sunday",
   "monday",
   "tuesday",
   "wednesday",
   "thursday",
   "friday",
   "saturday"
];
var revenues = [
   20000,
   14000,
   12000,
   15000,
   18000,
   19000,
   22000
];
var clients = [
   201,
   140,
   80,
   150,
   190,
   170,
   202
];


function renderChart() {
   var ctx = document.getElementById("myChart").getContext('2d');
   var mixChart = new Chart(ctx, {
   type: 'bar',
   data: {
       labels: labels,
       datasets: [
           {
               type: 'line',
               label: "Revenues",
               data: revenues,
               borderColor: 'rgba(75, 192, 192, 1)',
               backgroundColor: 'rgba(0, 0, 0, 0)',
               yAxisID: 'revenues',
           },
           {
               label: "Clients",
               data: clients,
               borderColor: 'rgba(0, 0, 0, 0)',
               backgroundColor: 'rgba(192, 75, 192, 0.5)',
               yAxisID: 'clients',
           }
       ]
   },
   options: {
       scales: {
           yAxes: [
               {
                   id: "revenues",
                   ticks: {
                       beginAtZero: true,
                   },
                   scaleLabel: {
                       display: true,
                       labelString: 'Revenues (U$)'
                     }
               },
               {
                   id: "clients",
                   position: 'right',
                   ticks: {
                       beginAtZero: true,
                   },
                   scaleLabel: {
                       display: true,
                       labelString: 'Clients'
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
         console.log(`result: ${JSON.stringify(result)}`)

           $("#loadingMessage").html("");
           var data = [];
           data.push(result.thisWeek);
           data.push(result.lastWeek);
           var labels = result.labels;
           renderChart(data, labels);
       },
       error: function (err) {
           $("#loadingMessage").html("Error");
       }
   });
}



$(document).ready(getChartData());
