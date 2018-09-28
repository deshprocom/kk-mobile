import {
  queryRealTime,
  queryLocal,
  queryRateLeader
} from '../services/exchangeRate';

export default {
  namespace: 'exchangeRate',

  state: {
    realTimeRates: {},
    localRates: {},
    rateLeaders: []
  },

  effects: {
    * fetchRealTime(_, {call, put}) {
      const response = yield call(queryRealTime);
      yield put({
        type: 'setRealTime',
        payload: response.data,
      });
    },
    * fetchLocalRate(_, {call, put}) {
      const response = yield call(queryLocal);
      yield put({
        type: 'setLocalRate',
        payload: response.data,
      });
    },
    * fetchRateLeader({payload}, {call, put}) {
      const response = yield call(queryRateLeader, payload);
      yield put({
        type: 'setRateLeader',
        payload: response.data.items,
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
    setRateLeader(state, action) {
      return {
        ...state,
        rateLeaders: action.payload,
      };
    },
  },
};
