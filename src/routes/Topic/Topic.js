import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ topic }) => ({
  topic
}))
export default class Topic extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.dispatch({
      type: 'topic/fetchTopicDetail',
      payload: { id: params.id },
    })
  }
  render() {
    return (
      <div>
        帖子详情
      </div>
    );
  }
}
