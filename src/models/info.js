import {
  queryInfoDetail,
  queryInfos,
} from '../services/info';
import {logMsg} from "../utils/utils";

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
      logMsg('models/info 数据redux处理',state,action)
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
