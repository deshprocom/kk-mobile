import {
  queryCategories,
} from '../services/shop';

export default {
  namespace: 'shop',
  
  state: {
    categories: null,
  },
  
  effects: {
    *fetchCategories({ payload }, { call, put }) {
      const response = yield call(queryCategories, payload);
      yield put({
        type: 'setCategories',
        payload: response.data.categories,
      });
    },
  },
  
  reducers: {
    setCategories(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },
  },
};
