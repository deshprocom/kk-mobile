import request from '../utils/request';
import {toSnakeToJson} from "../utils/utils";

export async function queryShowSaunas(params) {
  return request(`/saunas/access_permission?${toSnakeToJson(params)}`);
}
