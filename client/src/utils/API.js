import axios from 'axios';

// change uri when in production
export const getUserData = () => {
   return axios.get('/api/plants');
};

export const updateZipcode = (zipcode) => {
   console.log(`RUNNING: updateZipcode`)
   console.log(zipcode)
   return axios.put('/api/user', zipcode)
}


export default {
   getUserData,
   updateZipcode
}