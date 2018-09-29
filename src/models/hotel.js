import {
  queryHotels,
  queryHotelDetail,
} from '../services/hotel';

export default {
  namespace: 'hotel',
  
  state: {
    hotels: [],
    hotelDetail: null,
  },
  
  effects: {
    *fetchHotels({ payload }, { call, put }) {
      const response = yield call(queryHotels, payload);
      yield put({
        type: 'setHotels',
        payload: response.data.items,
      });
    },
    *fetchHotelDetail({ payload }, { call, put }) {
      const response = yield call(queryHotelDetail, payload);
      yield put({
        type: 'setHotelDetail',
        payload: response.data.hotel,
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
    setHotelDetail(state, action) {
      return {
        ...state,
        hotelDetail: action.payload,
      };
    },
  },
};
