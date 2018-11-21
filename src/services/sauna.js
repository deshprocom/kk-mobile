import request from '../utils/request';
import {logMsg, toSnakeToJson} from "../utils/utils";

export async function queryShowSaunas(params) {
  return request(`/saunas/access_permission?${toSnakeToJson(params)}`);
}

export async function querySaunas(params) {
  return request(`/saunas?${toSnakeToJson(params)}`);
}

export async function querySauna(params) {
  return request('/saunas/:id', {urlData: params});
}
