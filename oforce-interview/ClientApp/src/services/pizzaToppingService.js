import axios from 'axios';
import * as helpers from './serviceHelpers';

const getToppingsByPizzaId = (id)=>{
  const config = {
    method:"GET",
    url: helpers.API_HOST_PREFIX + `api/pizzatoppings`,
    crossdomain :true,
    headers : {"Content-Type" : "application/json"}
  }

  return axios(config)
    .then(helpers.onGlobalError)
    .catch(helpers.onGlobalError)
}

const insertToppingToPizza = (data)=>{
  const config = {
    method:"INSERT",
    url:helpers.API_HOST_PREFIX + `api/pizzatoppings`,
    crossdomain: true,
    headers : {"Content-Type" : "application/json"}
  }
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError)
}



const deleteTopping = id => {
  const config = {
    method: "DELETE",
    url: helpers.API_HOST_PREFIX + `/api/toppings/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};



export { getToppingsByPizzaId,insertToppingToPizza,deleteTopping}