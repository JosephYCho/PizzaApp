import axios from "axios";
import * as helpers from "./serviceHelpers";

const fileUpload=(data)=>{
  const config = {
    method: "POST",
    url:helpers.API_HOST_PREFIX + "/api/fileUpload",
    data,
    crossdomain:true,
    headers:{"Content-Type": "application/json"}
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError)
}



export {fileUpload}