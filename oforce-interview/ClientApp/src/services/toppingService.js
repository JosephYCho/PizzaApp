import axios from "axios";
import * as helpers from "./serviceHelpers";

const getAll = () => {
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + "api/toppings",
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getById = id => {
  const config = {
    method: "GET",
    url: helpers.API_HOST_PREFIX + `api/toppings/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const insertTopping = data => {
  const config = {
    method: "POST",
    url: helpers.API_HOST_PREFIX + `api/toppings`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updateTopping = (data, id) => {
  const config = {
    method: "PUT",
    url: helpers.API_HOST_PREFIX + `api/toppings/${id}`,
    crossdomain: true,
    data,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const deleteTopping = id => {
  const config = {
    method: "DELETE",
    url: helpers.API_HOST_PREFIX + `api/toppings/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { getAll, getById, insertTopping, updateTopping, deleteTopping };
