import {
  queryCategories,
  queryProducts,
} from '../services/shop';

export default {
  namespace: 'shop',
  
  state: {
    categories: null,
    products: null,
  },
  
  effects: {
    *fetchCategories({ payload }, { call, put }) {
      const response = yield call(queryCategories, payload);
      yield put({
        type: 'setCategories',
        payload: response.data.categories,
      });
    },
    *fetchProducts({ payload }, { call, put }) {
      const response = yield call(queryProducts, payload);
      yield put({
        type: 'setProducts',
        payload: response.data.items,
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
    setProducts(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
};
