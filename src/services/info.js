import request from '../utils/request';

export async function queryInfoDetail(params) {
  return request('/infos/:id', { urlData: params });
}
