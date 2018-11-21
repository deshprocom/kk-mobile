import {
  queryTopics,
  queryTopicDetail,
  queryTopicComments,
  queryEssence
} from '../services/topic';

export default {
  namespace: 'topic',

  state: {
    topics: [],
    topicsListView: [],
    topicsNextPage: 1,
    listViewTop: 0,
    topicDetail: null,
    topicComments:[],
    essence: [],
    essencesListView: [],
    essencesNextPage: 1,
    essenceListViewTop: 0,
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
    *fetchEssence({ payload }, { call, put }) {
      const response = yield call(queryEssence, payload);
      yield put({
        type: 'setEssence',
        payload: response.data.items,
      });
    },
  },

  reducers: {
    setTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
        topicsNextPage: ++state.topicsNextPage,
        topicsListView: state.topicsListView.concat(action.payload)
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
    setListViewTop(state, action) {
      return {
        ...state,
        listViewTop: action.payload,
      };
    },
    initTopicsData(state){
      return {
        ...state,
        topics: [],
        topicsListView: [],
        topicsNextPage: 1,
        listViewTop: 0,
      };
    },
    setEssence(state, action) {
      return {
        ...state,
        essence: action.payload,
        essencesNextPage: ++state.essencesNextPage,
        essencesListView: state.essencesListView.concat(action.payload)
      };
    },
    setEssenceListViewTop(state, action) {
      return {
        ...state,
        essenceListViewTop: action.payload,
      };
    },
    initEssencesData(state){
      return {
        ...state,
        essence: [],
        essencesListView: [],
        essencesNextPage: 1,
        essenceListViewTop: 0,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname === '/homepage/discovery' && history.action === 'PUSH') {
          // dispatch({
          //   type: 'initEssencesData',
          // });
        }
      });
    },
  },
};
