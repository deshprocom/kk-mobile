import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import SaunaGoBack from '../saunas/GoBack'

export default class SaunaList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
    };
  }

  componentDidMount() {
    this.lv.scrollTo(0, this.props.listViewTop);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.saunas),
    });
  }

  render() {
    const { isLoading, onEndReached, onClickItem} = this.props;
    const row = (sauna, sectionID, rowID) => {
      let linkPath = `/saunas/${sauna.id}`;
      return (
        <Link key={rowID} to={linkPath} onClick={onClickItem}>
          {sauna.title}
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
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <SaunaGoBack currentPath={'saunas'}/>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          initialListSize={100}
        />
      </div>
    );
  }
}
