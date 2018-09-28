import request from '../utils/request';
import {logMsg, toSnakeToJson} from "../utils/utils";

export async function queryRealTime() {
  return request(`/exchange_rates?exchange_type=real_time`);
}

export async function queryLocal() {
  return request(`/exchange_rates?exchange_type=local`);
}

export async function queryRateLeader(params) {
  logMsg('exchange_traders参数', params);
  return request(`/exchange_traders?${toSnakeToJson(params)}`);
}
