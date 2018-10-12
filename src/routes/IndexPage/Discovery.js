import React, { Component } from 'react';
import { connect } from 'dva';
import Topics from "../../components/indexPage/Topics";

@connect(({ topic }) => ({
  topic
}))
export default class Discovery extends Component {
  state = {
    isLoading: true,
  };
  
  componentDidMount() {
    if (this.props.topic.topicsListView.length > 0)
      this.setState({isLoading: false });
    else
      this.fetchTopics();
  }
  
  UNSAFE_componentWillReceiveProps() {
    this.setState({isLoading: false });
  }
  
  fetchTopics = () => {
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.props.topic.topicsNextPage,
      }
    })
  };
  
  onEndReached = () => {
    this.setState({isLoading: true});
    this.fetchTopics();
  };
  
  onClickItem = () => {
    const scroll= document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'topic/setListViewTop',
      payload: scroll
    })
  };
  
  render() {
    const { listViewTop, topicsListView } = this.props.topic;
    return (
      <div>
        <Topics
          topics={topicsListView}
          onEndReached={this.onEndReached}
          onClickItem={this.onClickItem}
          listViewTop={listViewTop}
          isLoading={this.state.isLoading}/>
      </div>
    );
  }
}
