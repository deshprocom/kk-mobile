import request from '../utils/request';
import { toSnakeToJson } from '../utils/utils';

export async function queryTopics(params) {
  return request(`/topics?${toSnakeToJson(params)}`);
}


