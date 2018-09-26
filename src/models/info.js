import {
  queryInfoDetail,
  queryInfos,
} from '../services/info';

export default {
  namespace: 'info',
  
  state: {
    infoDetail: {},
    infos: [],
  },
  
  effects: {
    *fetchInfoDetail({ payload }, { call, put }) {
      const response = yield call(queryInfoDetail, payload);
      yield put({
        type: 'setInfoDetail',
        payload: response.data.info,
      });
    },
    *fetchInfos({ payload }, { call, put }) {
      const response = yield call(queryInfos, payload);
      yield put({
        type: 'setInfos',
        payload: response.data.items,
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
    setInfos(state, action) {
      return {
        ...state,
        infos: action.payload,
      };
    },
  },
};
