import axios from 'axios';

// change uri when in production


export const updateZipcode = (zipcode) => {
   console.log(`RUNNING: updateZipcode`)
   console.log(zipcode)
   return axios.put('/api/user', zipcode)
}

export const getUserData = () => {
   return axios.get('/api/user');
};

export const addPlant = (plantData) => {
   console.log(`RUNNING: addPlant`)
   console.log(`plantData: ${plantData}`)
   return axios.post('/api/plants', plantData)
}


export default {
   getUserData,
   updateZipcode
}