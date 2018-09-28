import request from '../utils/request';
import { toSnakeToJson } from '../utils/utils';

export async function queryHotels(params) {
  return request(`/hotels?${toSnakeToJson(params)}`);
}


