import axios from 'axios';

// change uri when in production


export const updateZipcode = (zipcode) => {
   console.log(`RUNNING: updateZipcode`)
   console.log(zipcode)
   return axios.put('/api/user', zipcode)
}

export const getUserData = () => {
   return axios.get('/api/plants');
};

export const addPlant = (plantData) => {
   console.log(`RUNNING: addPlant`)
   return axios.post('/api/plant', plantData)
}


export default {
   getUserData,
   updateZipcode
}