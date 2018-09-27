import {
  queryRealTime,
} from '../services/exchangeRate';

export default {
  namespace: 'exchangeRate',
  
  state: {
    realTimeRates: {},
  },
  
  effects: {
    *fetchRealTime(_, { call, put }) {
      const response = yield call(queryRealTime);
      yield put({
        type: 'setRealTime',
        payload: response.data,
      });
    },
  },
  
  reducers: {
    setRealTime(state, action) {
      return {
        ...state,
        realTimeRates: action.payload,
      };
    },
  },
};
