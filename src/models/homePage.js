import {
  queryBanners,
  queryRecommends,
} from '../services/homePage';

export default {
  namespace: 'homePage',
  
  state: {
    banners: [],
    recommends: [],
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
  },
  
  subscriptions: {
    setup({ dispatch, history }) {

      history.listen(({pathname}) => {
        if (pathname === '/') {
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
