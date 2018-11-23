import {
  queryBanners,
  queryRecommends,
  queryAppVersions
} from '../services/homePage';

export default {
  namespace: 'homePage',

  state: {
    banners: [],
    recommends: [],
    lotteryVisible: true,
    app_versions:{}
  },

  effects: {
    *fetchBanners(_, { call, put }) {
      const response = yield call(queryBanners);
      yield put({
        type: 'setBanners',
        payload: response.data.items,
      });
    },
    *fetchRecommends(_, { call, put }) {
      const response = yield call(queryRecommends);
      yield put({
        type: 'setRecommends',
        payload: response.data.items,
      });
    },
    *fetchAppVersions(_, { call, put }) {
      const response = yield call(queryAppVersions);
      yield put({
        type: 'setAppVersions',
        payload: response.data,
      });
    },
  },

  reducers: {
    setBanners(state, action) {
      return {
        ...state,
        banners: action.payload,
      };
    },
    setRecommends(state, action) {
      return {
        ...state,
        recommends: action.payload,
      };
    },
    lotteryVisibleToFalse(state) {
      return {
        ...state,
        lotteryVisible: false,
      };
    },
    setAppVersions(state, action) {
      return {
        ...state,
        app_versions:action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {

      history.listen(({pathname}) => {
        if (pathname === '/homepage') {
          dispatch({
            type: 'fetchBanners',
          });
          dispatch({
            type: 'fetchRecommends',
          });
        }
      });
    },
  },
};
