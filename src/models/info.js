import {
  queryInfoDetail,
  queryInfos,
  queryInfoComments
} from '../services/info';
import {logMsg} from "../utils/utils";

export default {
  namespace: 'info',

  state: {
    infoDetail: {},
    infos: [],
    info_comments:[]
  },

  effects: {
    *fetchInfoComments({ payload }, { call, put }) {
      const response = yield call(queryInfoComments, payload);
      logMsg('评论',response.data)
      yield put({
        type: 'setInfoComments',
        payload: response.data.items,
      });
    },
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
    setInfoComments(state, action) {
      logMsg('评论Model',action.payload)
      return {
        ...state,
        info_comments: action.payload,
      };
    },
    setInfoDetail(state, action) {
      logMsg('models/info 数据redux处理',action.payload)
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
