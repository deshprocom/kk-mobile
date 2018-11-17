import React, { Component } from 'react';
import { connect } from 'dva';
import Topics from "../../components/indexPage/Topics";
import { Tabs, Badge } from 'antd-mobile';

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
    else{
      this.fetchEssence()
      this.fetchTopics()
    }

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

  fetchEssence = ()=>{
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
    const scroll= document.body.scrollTop || document.documentElement.scrollTop;
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
    const scroll= document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'topic/setListViewTop',
      payload: scroll
    })
  };



  render() {
    const { listViewTop, topicsListView,essenceListViewTop, essencesListView} = this.props.topic;

    console.log(this.props.topic)

    const tabs = [
      { title: <Badge>精华</Badge> },
      { title: <Badge>广场</Badge> }
    ];

    return (
      <div>
        <Tabs tabs={tabs}
              initialPage={0}
              onChange={(tab, index) => { console.log('onChange', index, tab)}}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              style={{position:'fixed'}}
        >

          <Topics
            topics={essencesListView}
            onEndReached={this.onEndReachedE}
            onClickItem={this.onClickItemE}
            listViewTop={essenceListViewTop}
            isLoading={this.state.isLoading}/>

          <Topics
            topics={topicsListView}
            onEndReached={this.onEndReached}
            onClickItem={this.onClickItem}
            listViewTop={listViewTop}
            isLoading={this.state.isLoading}/>

        </Tabs>

      </div>
    );
  }
}
