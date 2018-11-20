import {
  queryShowSaunas
} from '../services/sauna';

export default {
  namespace: 'sauna',

  state: {
    showSaunas: false,
  },

  effects: {
    *fetchShowSaunas({ payload }, { call, put }) {
      const response = yield call(queryShowSaunas, payload);
      const showSaunas = response.code === 0;
      yield put({
        type: 'setShowSaunas',
        payload: showSaunas,
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
  },
};
