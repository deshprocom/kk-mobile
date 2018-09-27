import request from '../utils/request';
import {logMsg, toSnakeToJson} from "../utils/utils";

export async function queryInfoComments(params) {
  logMsg('Comments参数', params);
  return request(`/comments?${toSnakeToJson(params)}`);
}

export async function queryInfoDetail(params) {
  logMsg('Info 的请求 url;/infos/:id,参数', params)
  let ret = request('/infos/:id', {urlData: params});
  logMsg('Info 的services 接口响应:', ret)
  return ret
}

export async function queryInfos(params) {
  const urlData = {type: params['type']};
  return request(`/info_types/:type/infos?${toSnakeToJson(params)}`, {urlData});
}
