import React, { Component } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import InfoList from "../../components/info/InfoList";

@connect(({ info, sauna }) => ({
  info,
  sauna,
}))
export default class Infos extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(props.location.search);

    this.state = {
      isLoading: true,
      infoType: params.type,
      showSaunas: false,
    };
  }

  componentDidMount() {
    if (this.props.info.infosListView.length > 0)
      this.setState({isLoading: false});
    else
      this.fetchInfos();

    if (this.state.infoType !== 'recreation') return;

    if(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.getAddress);
    else
      alert("您的浏览器不支持地理定位");
  }

  getAddress = (pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    this.props.dispatch({
      type: 'sauna/fetchShowSaunas',
      payload: {
        latitude,
        longitude,
        platform: isIOS ? 'ios' : 'android'
      }
    })
  };

  onEndReached = () => {
    this.setState({isLoading: true});
    this.fetchInfos();
  };

  fetchInfos = () => {
    const { info } = this.props;
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        type: this.state.infoType,
        page: info.infosNextPage
      }
    })
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const showSaunas =  this.state.infoType === 'recreation' && nextProps.sauna.showSaunas;
    this.setState({
      isLoading: false,
      showSaunas
    });
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
    const { isLoading, infoType, showSaunas } = this.state;
    return (
      <div>
        <InfoList
          infos={infosListView}
          listViewTop={listViewTop}
          onEndReached={this.onEndReached}
          onClickItem={this.onClickItem}
          infoType={infoType}
          showSaunas={true}
          isLoading={isLoading}/>
      </div>
    );
  }
}
