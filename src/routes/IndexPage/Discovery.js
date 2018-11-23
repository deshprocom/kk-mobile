import React, {Component} from 'react';
import {connect} from 'dva';
import Topics from "../../components/indexPage/Topics";
import DiscoveryBar from "../../components/indexPage/DiscoveryBar";

@connect(({topic}) => ({
  topic
}))
export default class Discovery extends Component {
  state = {
    isLoading: true,
    show_index: 0
  };

  componentDidMount() {
    if (this.props.topic.topicsListView.length > 0)
      this.setState({isLoading: false});
    else {
      this.fetchEssence()
      this.fetchTopics()
    }

  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({isLoading: false});
  }

  fetchTopics = () => {
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.props.topic.topicsNextPage,
      }
    })
  };

  fetchEssence = () => {
    this.props.dispatch({
      type: 'topic/fetchEssence',
      payload: {
        page: this.props.topic.essencesNextPage,
      }
    })
  }

  onEndReachedE = () => {
    this.setState({isLoading: true});
    this.fetchEssence();
  };

  onClickItemE = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'topic/setEssenceListViewTop',
      payload: scroll
    })
  };

  onEndReached = () => {
    this.setState({isLoading: true});
    this.fetchTopics();
  };

  onClickItem = () => {
    const scroll = document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'topic/setListViewTop',
      payload: scroll
    })
  };

  changed_index = (index) => {
    window.scrollTo(0, 0);
    this.setState({
      show_index: index
    })
  }

  render() {
    const {listViewTop, topicsListView, essenceListViewTop, essencesListView} = this.props.topic;

    console.log(this.props.topic)

    return (
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>

        <DiscoveryBar show_index={this.state.show_index} changed_index={this.changed_index}/>

        <div style={{height:50}}/>

        {this.state.show_index === 0 ?

          <Topics
            topics={essencesListView}
            onEndReached={this.onEndReachedE}
            onClickItem={this.onClickItemE}
            listViewTop={essenceListViewTop}
            isLoading={this.state.isLoading}/> :

          <Topics
            topics={topicsListView}
            onEndReached={this.onEndReached}
            onClickItem={this.onClickItem}
            listViewTop={listViewTop}
            isLoading={this.state.isLoading}/>}
      </div>
    );
  }
}
