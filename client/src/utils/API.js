import axios from 'axios';

// change uri when in production
export const getUserData= () => {
   return axios.get('/api/plants');
};


export default {
   getUserData
}