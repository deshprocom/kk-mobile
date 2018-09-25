import {
  queryTopics,
} from '../services/topic';

export default {
  namespace: 'topic',
  
  state: {
    topics: [],
  },
  
  effects: {
    *fetchTopics({ payload }, { call, put }) {
      const response = yield call(queryTopics, payload);
      yield put({
        type: 'setTopics',
        payload: response.data.items,
      });
    },
  },
  
  reducers: {
    setTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      };
    },
  },
};
