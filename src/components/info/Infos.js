import React, { Component } from 'react';
import { ListView } from 'antd-mobile';
import { Link } from 'dva/router';

export default class Infos extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    
    this.state = {
      dataSource,
      isLoading: true,
      nextPage: 1,
      infoType: props.infoType,
    };
  
    this._infosData = [];
  }
  
  componentDidMount() {
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        page: this.state.nextPage,
        type: this.state.infoType,
      }
    })
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.infos !== this.props.infos) {
      let nextPage = this.state.nextPage + 1;
  
      this._infosData = this._infosData.concat(nextProps.infos);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._infosData),
        isLoading: false,
        nextPage
      });
    }
  }
  
  onEndReached = () => {
    this.setState({ isLoading: true });
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        page: this.state.nextPage,
        type: this.state.infoType,
      }
    })
  };
  
  render() {
    const row = (info, sectionID, rowID) => {
      let linkPath = `/infos/${info.id}`;
      return (
        <Link key={rowID} to={linkPath}>
          <div style={{ padding: '35px' }}>
            {info.title}
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
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
