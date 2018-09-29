import {
  queryHotels,
} from '../services/hotel';

export default {
  namespace: 'hotel',
  
  state: {
    hotels: [],
  },
  
  effects: {
    *fetchHotels({ payload }, { call, put }) {
      const response = yield call(queryHotels, payload);
      yield put({
        type: 'setHotels',
        payload: response.data.items,
      });
    },
  },
  
  reducers: {
    setHotels(state, action) {
      return {
        ...state,
        hotels: action.payload,
      };
    },
  },
};
