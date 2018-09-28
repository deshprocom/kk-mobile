import {
  queryRealTime,
  queryLocal
} from '../services/exchangeRate';

export default {
  namespace: 'exchangeRate',

  state: {
    realTimeRates: {},
    localRates:{}
  },

  effects: {
    *fetchRealTime(_, { call, put }) {
      const response = yield call(queryRealTime);
      yield put({
        type: 'setRealTime',
        payload: response.data,
      });
    },
    *fetchLocalRate(_, { call, put }) {
      const response = yield call(queryLocal);
      yield put({
        type: 'setLocalRate',
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
    setLocalRate(state, action) {
      return {
        ...state,
        localRates: action.payload,
      };
    },
  },
};
