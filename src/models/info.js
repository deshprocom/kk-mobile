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
    infosListView: [],
    infosNextPage: 1,
    listViewTop: 0,
    info_comments:[],
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
      return {
        ...state,
        infoDetail: action.payload,
      };
    },
    setInfos(state, action) {
      return {
        ...state,
        infos: action.payload,
        infosNextPage: ++state.infosNextPage,
        infosListView: state.infosListView.concat(action.payload)
      };
    },
    setListViewTop(state, action) {
      return {
        ...state,
        listViewTop: action.payload,
      };
    },
    initInfosData(state){
      return {
        ...state,
        infos: [],
        infosListView: [],
        infosNextPage: 1,
        listViewTop: 0,
      };
    },
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname === '/infos' && history.action === 'PUSH') {
          dispatch({
            type: 'initInfosData',
          });
        }
      });
    },
  },
};
