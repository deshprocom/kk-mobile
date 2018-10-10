import React, {Component} from 'react';
import {connect} from 'dva';
import TopicDetail from '../../components/topic/TopicDetail'

@connect(({topic}) => ({
  topic
}))
export default class Topic extends Component {
  componentDidMount() {
    const {params} = this.props.match;
    this.props.dispatch({
      type: 'topic/fetchTopicDetail',
      payload: {id: params.id},
    });

    this.props.dispatch({
      type: 'topic/fetchTopicComments',
      payload: {target_id: params.id, target_type: 'topic'},
    })
  }

  render() {
    const {topicDetail,topicComments} = this.props.topic;
    return (
      <div style={{backgroundColor:'white'}}>
        <TopicDetail topicDetail={topicDetail} topicComments={topicComments}/>
      </div>
    );
  }
}
