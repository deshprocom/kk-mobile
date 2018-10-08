import request from '../utils/request';
import { toSnakeToJson } from '../utils/utils';

export async function queryCategories() {
  return request('/shop/categories');
}

export async function queryProducts(params) {
  return request(`/shop/products?${toSnakeToJson(params)}`);
}

export async function queryProductDetail(params) {
  return request(`/shop/products/${params.id}`);
}

