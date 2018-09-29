import {
  queryTopics,
  queryTopicDetail,
} from '../services/topic';

export default {
  namespace: 'topic',
  
  state: {
    topics: [],
    topicDetail: null,
  },
  
  effects: {
    *fetchTopics({ payload }, { call, put }) {
      const response = yield call(queryTopics, payload);
      yield put({
        type: 'setTopics',
        payload: response.data.items,
      });
    },
    *fetchTopicDetail({ payload }, { call, put }) {
      const response = yield call(queryTopicDetail, payload);
      yield put({
        type: 'setTopicDetail',
        payload: response.data,
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
    setTopicDetail(state, action) {
      return {
        ...state,
        topicDetail: action.payload,
      };
    },
  },
};
