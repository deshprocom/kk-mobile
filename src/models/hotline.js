import {
  queryFastFoods,
  queryPublicServices,
} from '../services/hotline';

export default {
  namespace: 'hotline',
  
  state: {
    fastFoods: null,
    publicServices: null,
  },
  
  effects: {
    *fetchFastFoods({ payload }, { call, put }) {
      const response = yield call(queryFastFoods, payload);
      yield put({
        type: 'setFastFoods',
        payload: response.data.items,
      });
    },
    *fetchPublicServices({ payload }, { call, put }) {
      const response = yield call(queryPublicServices, payload);
      yield put({
        type: 'setPublicServices',
        payload: response.data.items,
      });
    },
  },
  
  reducers: {
    setFastFoods(state, action) {
      return {
        ...state,
        fastFoods: action.payload,
      };
    },
    setPublicServices(state, action) {
      return {
        ...state,
        publicServices: action.payload,
      };
    },
  },
};
