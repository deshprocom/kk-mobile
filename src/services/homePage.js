import request from '../utils/request';

export async function queryBanners() {
  return request('/banners');
}

export async function queryRecommends() {
  return request('/recommends');
}

export async function queryAppVersions() {
  return request('/app_versions');
}
