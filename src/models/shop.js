import {
  queryCategories,
  queryProducts,
  queryProductDetail,
} from '../services/shop';

export default {
  namespace: 'shop',
  
  state: {
    categories: null,
    products: null,
    productDetail: null,
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
    *fetchProductDetail({ payload }, { call, put }) {
      const response = yield call(queryProductDetail, payload);
      yield put({
        type: 'setProductDetail',
        payload: response.data.product,
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
    setProductDetail(state, action) {
      return {
        ...state,
        productDetail: action.payload,
      };
    },
  },
};
