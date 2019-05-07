import axios from "axios";

axios.default.withCredentials = true;

axios.interceptors.request.use(function(config){
  config.withCredentials = true;
  console.log(config);
  return config;
});


const onGlobalSuccess = response =>{
  return response.data
};

const onGlobalError = error =>{
  return Promise.reject(error)
};

const API_HOST_PREFIX = "https://localhost:44308/"


export {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX
}
