import request from '../utils/request';
import {toSnakeToJson} from "../utils/utils";

export async function queryInfoDetail(params) {
  return request('/infos/:id', { urlData: params });
}

export async function queryInfos(params) {
  const urlData =  { type: params['type'] };
  return request(`/info_types/:type/infos?${toSnakeToJson(params)}`, { urlData });
}
