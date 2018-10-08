import request from '../utils/request';

export async function queryFastFoods() {
  return request('/hotlines?line_type=fast_food');
}

export async function queryPublicServices() {
  return request('/hotlines?line_type=public_service');
}


