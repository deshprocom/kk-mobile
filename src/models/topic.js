import {
  queryTopics,
  queryTopicDetail,
  queryTopicComments
} from '../services/topic';

export default {
  namespace: 'topic',

  state: {
    topics: [],
    topicDetail: null,
    topicComments:[]
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
    *fetchTopicComments({ payload }, { call, put }) {
      const response = yield call(queryTopicComments, payload);
      yield put({
        type: 'setTopicComments',
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
    setTopicComments(state, action) {
      return {
        ...state,
        topicComments: action.payload,
      };
    },
  },
};
