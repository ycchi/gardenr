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

const weatherObj = {
   zipCode: "",
   dateRange: [],
   rainArr: [],
   avgTemp: []
};

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

// GET request to weather API and send to /api/weather
const getWeatherData = (req, res) => {
   axios.all([

      axios.get("http://localhost:3000/api/gardens"),
      
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(0, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(1, 'days').format("YYYY-MM-DD")}
      `),          
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(2, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(3, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(3, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(4, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(5, 'days').format("YYYY-MM-DD")}
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(6, 'days').format("YYYY-MM-DD")}
      `)
      // ,
      // axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=${moment().subtract(7, 'days').format("YYYY-MM-DD")}
      // `)
   ]
      
   )
     .then(axios.spread((resZip, res0, res1, res2, res3, res4, res5, res6) => {  
   

         // get precipitation total and push to array
         weatherObj.rainArr.push(res0.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res1.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res2.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res3.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res4.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res5.data.forecast.forecastday[0].day.totalprecip_in);
         weatherObj.rainArr.push(res6.data.forecast.forecastday[0].day.totalprecip_in);
        // weatherObj.rainArr.push(res7.data.forecast.forecastday[0].day.totalprecip_in);

         

         // get daily avg temp
         weatherObj.avgTemp.push(res0.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res1.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res2.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res3.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res4.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res5.data.forecast.forecastday[0].day.avgtemp_f);
         weatherObj.avgTemp.push(res6.data.forecast.forecastday[0].day.avgtemp_f);
        // weatherObj.avgTemp.push(res7.data.forecast.forecastday[0].day.avgtemp_f);

         // get date range
         weatherObj.dateRange.push(res6.data.forecast.forecastday[0].date);
         weatherObj.dateRange.push(res0.data.forecast.forecastday[0].date);
         
     }))
     .then(() => {
        // get rainTotal from collected data
        weatherObj.rainSum = weatherObj.rainArr.reduce(getSum).toFixed(2);
      
        // get avgTemp from collected data
        const x = weatherObj.avgTemp.reduce(getSum) / 7
        weatherObj.avgTempWeek = x.toFixed(2)

        // convert temperature to inches.
        weatherObj.tempInch  = convertInches(weatherObj.avgTempWeek);
        weatherObj.rainTotal = weatherObj.rainSum - weatherObj.tempInch;

        weatherObj.rainTotal= weatherObj.rainTotal.toFixed(2);

        // send data as json to 'api/weather
        res.json(weatherObj);
     })
     .catch(error => console.log(error));
}


module.exports = {
   getWeatherData
}

