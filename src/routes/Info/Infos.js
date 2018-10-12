import React, { Component } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import InfoList from "../../components/info/InfoList";

@connect(({ info }) => ({
  info
}))
export default class Infos extends Component {
  state = {
    isLoading: true,
  };
  
  componentDidMount() {
    if (this.props.info.infosListView.length > 0)
      this.setState({isLoading: false });
    else
      this.fetchInfos();
  }
  
  onEndReached = () => {
    this.setState({isLoading: true});
    this.fetchInfos();
  };
  
  fetchInfos = () => {
    const { info, location } = this.props;
    const params = queryString.parse(location.search);
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        type: params.type,
        page: info.infosNextPage
      }
    })
  };
  
  UNSAFE_componentWillReceiveProps() {
    this.setState({isLoading: false });
  }
  
  onClickItem = () => {
    const scroll= document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'info/setListViewTop',
      payload: scroll
    })
  };
  
  render() {
    const { listViewTop, infosListView } = this.props.info;
    return (
      <div>
        <InfoList
          infos={infosListView}
          listViewTop={listViewTop}
          onEndReached={this.onEndReached}
          onClickItem={this.onClickItem}
          isLoading={this.state.isLoading}/>
      </div>
    );
  }
}
