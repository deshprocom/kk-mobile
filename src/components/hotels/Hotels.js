import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import ReactDOM from 'react-dom';

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hotels !== this.props.hotels) {
      const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.hotels),
        height,
      });
    }
  }


  render() {
    const { isLoading, onEndReached } = this.props;
    const row = (hotel, sectionID, rowID) => {
      let linkPath = `/hotels/${hotel.id}`;
      return (
        <Link key={rowID} to={linkPath}>
          <div style={{padding: '50px 20px'}}>
            {hotel.title}
          </div>
        </Link>
      );
    };

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 2,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : '已经没有啦！'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
