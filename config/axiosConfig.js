import Axios from 'axios';

export default{
    const http = Axios.create({
        baseURL: 'https://covid-api.mmediagroup.fr/v1',
      })
} 
    
  
  Vue.prototype.$axios = axiosInstance;
  