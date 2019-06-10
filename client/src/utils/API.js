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

export const getPlantById = (plantId) => {
   return axios.get(`/api/plants/${plantId}`);
}

export const removePlant = (plantId) => {
   return axios.delete(`/api/plants/${plantId}`)
};

export const addLog = (logData) => {
   return axios.post(`/api/logs`, logData)
}

export default {
   getUserData,
   updateZipcode,
   removePlant,
   getPlantById,

   addLog
}