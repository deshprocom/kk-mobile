import request from '../utils/request';
import { toSnakeToJson } from '../utils/utils';

export async function queryTopics(params) {
  return request(`/topics?${toSnakeToJson(params)}`);
}

export async function queryTopicDetail(params) {
  return request(`/topics/${params.id}`);
}


export async function queryTopicComments(params) {
  return request(`/comments?${toSnakeToJson(params)}`);
}


