const axios = require("axios");

let weatherObj = {
   rainArr: []
};

let zipCode = "";

// date format: 2019-05-12
let date = "";
let queryString = `http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=${zipCode}&dt=${date}
`

// GET request to weather API and send to /api/weather
const getWeatherData = (req, res) => {
   axios.all([
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=2019-05-12
      `),
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=2019-05-13
      `),          
      axios.get(`http://api.apixu.com/v1/history.json?key=c8f2ed219aad4fe595204455191805&q=07013&dt=2019-05-14
      `)])
     .then(axios.spread((res1, res2, res3) => {  
         console.log(res1.data,res2.data, res3.data);
         console.log(res1.data.forecast.forecastday[0].day.totalprecip_in)
         
         // works!
         let res1Rain = res1.data.forecast.forecastday[0].day.totalprecip_in;
         weatherObj.rainArr.push(res1Rain);

         res.json(res1.data);
         
         
     }))
     .catch(error => console.log(error));
}

module.exports = {
   getWeatherData
}
