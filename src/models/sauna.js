import {
  queryShowSaunas,
  querySaunas,
  querySauna,
} from '../services/sauna';

export default {
  namespace: 'sauna',

  state: {
    showSaunas: false,
    sauna: {},
    saunas: [],
    saunasListView: [],
    saunasNextPage: 1,
    listViewTop: 0,
    latitude: null,
    longitude: null,
  },

  effects: {
    *fetchShowSaunas({ payload }, { call, put }) {
      const response = yield call(queryShowSaunas, payload);
      yield put({
        type: 'setShowSaunas',
        payload: response.data.accessible,
      });
      yield put({
        type: 'setLatAndLong',
        payload: payload,
      });
    },
    *fetchSaunas({ payload }, { call, put }) {
      const response = yield call(querySaunas, payload);
      yield put({
        type: 'setSaunas',
        payload: response.data.items,
      });
    },
    *fetchSauna({ payload }, { call, put }) {
      const response = yield call(querySauna, payload);
      yield put({
        type: 'setSauna',
        payload: response.data,
      });
    },
  },

  reducers: {
    setShowSaunas(state, action) {
      return {
        ...state,
        showSaunas: action.payload,
      };
    },
    setSaunas(state, action) {
      return {
        ...state,
        saunas: action.payload,
        saunasNextPage: ++state.saunasNextPage,
        saunasListView: state.saunasListView.concat(action.payload)
      };
    },
    setListViewTop(state, action) {
      return {
        ...state,
        listViewTop: action.payload,
      };
    },
    setLatAndLong(state, action) {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    setSauna(state, action) {
      return {
        ...state,
        sauna: action.payload.sauna,
      };
    },
  },
};
