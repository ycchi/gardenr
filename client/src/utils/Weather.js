const axios = require("axios");
const moment = require("moment");

// helper function to get total rain accumulation
function getSum(total, num) {
   return total + num;
}

// helper function to calculate .5 inch per 10 Deg F
function convertInches(degree) {
   let result = (degree - 60) * 0.5 / 10;
   return result;
}

// let weatherObj = {
//    zipCode: "07013",
//    dateRange: [],
//    rainArr: [],
//    avgTemp: []
// };

// get zipcode from logged in user.. 
// axios.get("http://localhost:3000/api/user")
//    .then((res) => {
//       console.log(`RUNNING: getZipcode
//       res.data: ${res.data}`)
//    })
//    .catch(err => console.log(err))



// date format: 2019-05-12
// let date = moment().subtract(0, 'days').format("YYYY-MM-DD");
// console.log(`today: ${date}`);
// console.log(`yesterday: ${moment().subtract(1, 'days').format("YYYY-MM-DD")}`)
// let queryString = `http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipCode}&dt=${date}
// `

export const getWeatherDataByZipcode = (zipcode) => {

   console.log(`RUNNING: getWeatherDataByZipcode`)
   console.log(`Zipcode: ${zipcode}`)


   const weatherData = {
      zipcode: zipcode,
      dateRange: [],
      rainArr: [],
      avgTemp: []
   }


   return axios.all([
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(0, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(1, 'days').format("YYYY-MM-DD")}
      `),          
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(2, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(3, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(4, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(5, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`https://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipcode}&dt=${moment().subtract(6, 'days').format("YYYY-MM-DD")}
      `)
      
   ])
   .then(axios.spread((res0, res1, res2, res3, res4, res5, res6) => {  
   

      // get precipitation total and push to array
      weatherData.rainArr.push(res0.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res1.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res2.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res3.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res4.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res5.data.forecast.forecastday[0].day.totalprecip_in);
      weatherData.rainArr.push(res6.data.forecast.forecastday[0].day.totalprecip_in);
     
   
      // get daily avg temp
      weatherData.avgTemp.push(res0.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res1.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res2.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res3.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res4.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res5.data.forecast.forecastday[0].day.avgtemp_f);
      weatherData.avgTemp.push(res6.data.forecast.forecastday[0].day.avgtemp_f);
     

      // get date range
      weatherData.dateRange.push(res6.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res5.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res4.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res3.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res2.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res1.data.forecast.forecastday[0].date);
      weatherData.dateRange.push(res0.data.forecast.forecastday[0].date);
      
  }))
  .then(() => {
     // get rainTotal from collected data
     weatherData.rainSum = weatherData.rainArr.reduce(getSum).toFixed(2);
   
     // get avgTemp from collected data
     const x = weatherData.avgTemp.reduce(getSum) / 7
     weatherData.avgTempWeek = x.toFixed(2)

     // convert temperature to inches.
     weatherData.tempInch  = convertInches(weatherData.avgTempWeek);
     weatherData.rainTotal = weatherData.rainSum - weatherData.tempInch;

     weatherData.rainTotal= weatherData.rainTotal.toFixed(2);

     // send data as json to 'api/weather
     // res.json(weatherData);
     console.log(`weatherData: ${weatherData}`)
     return weatherData
  })
  // .catch(error => console.log(error));

}


export default {
   getWeatherDataByZipcode
}