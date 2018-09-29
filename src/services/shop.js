import request from '../utils/request';
// import { toSnakeToJson } from '../utils/utils';

export async function queryCategories() {
  return request('/shop/categories');
}

