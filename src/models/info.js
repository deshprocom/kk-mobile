import {
  queryInfoDetail,
} from '../services/info';

export default {
  namespace: 'info',
  
  state: {
    infoDetail: {},
  },
  
  effects: {
    *fetchInfoDetail({ payload }, { call, put }) {
      const response = yield call(queryInfoDetail, payload);
      yield put({
        type: 'setInfoDetail',
        payload: response.data.info,
      });
    },
  },
  
  reducers: {
    setInfoDetail(state, action) {
      return {
        ...state,
        infoDetail: action.payload,
      };
    },
  },
};
