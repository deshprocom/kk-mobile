import request from '../utils/request';

export async function queryRealTime() {
  return request(`/exchange_rates?exchange_type=real_time`);
}

export async function queryLocal() {
  return request(`/exchange_rates?exchange_type=local`);
}
