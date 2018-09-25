import React, { Component } from 'react';
import { connect } from 'dva';
import { ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';

@connect(({ topic }) => ({
  topic
}))
export default class Discovery extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  
    this.state = {
      dataSource,
      isLoading: true,
      nextPage: 1,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  
    this._topicsData = [];
  }
  
  componentDidMount() {
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.state.nextPage
      }
    })
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.topic.topics !== this.props.topic.topics) {
      const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      let nextPage = this.state.nextPage + 1;
  
      this._topicsData = this._topicsData.concat(nextProps.topic.topics);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._topicsData),
        isLoading: false,
        height: height,
        nextPage
      });
    }
  }
  
  onEndReached = () => {
    this.setState({ isLoading: true });
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.state.nextPage
      }
    })
  };
  
  render() {
    const row = (rowData, sectionID, rowID) => {
      let user = rowData.user;
      return (
        <div key={rowID} style={{ padding: '35px' }}>
          {user.nick_name}
        </div>
      );
    };
  
    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
