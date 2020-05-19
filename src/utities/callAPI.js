import * as ConfigAPI from "./../constants/ConfigAPI";
import axios from "axios";

export default function callAPI(endpoint, method, body) {
  return axios({
    method: method,
    url: `${ConfigAPI.API_URL}/${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
}
