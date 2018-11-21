import React, { Component } from 'react';
import { connect } from 'dva';
import SaunaList from "../../components/saunas/SaunaList";

@connect(({ sauna }) => ({
  sauna,
}))
export default class Saunas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  
  componentDidMount() {
    if (this.props.sauna.saunasListView.length > 0)
      this.setState({isLoading: false});
    else
      this.fetchSaunas();
  }

  onEndReached = () => {
    this.setState({isLoading: true});
    this.fetchSaunas();
  };
  
  fetchSaunas = () => {
    const { sauna } = this.props;
    this.props.dispatch({
      type: 'sauna/fetchSaunas',
      payload: {
        page: sauna.saunasNextPage,
        latitude: sauna.latitude,
        longitude: sauna.longitude,
      }
    })
  };
  
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      isLoading: false,
    });
  }
  
  onClickItem = () => {
    const scroll= document.body.scrollTop || document.documentElement.scrollTop;
    this.props.dispatch({
      type: 'sauna/setListViewTop',
      payload: scroll
    })
  };
  
  render() {
    const { listViewTop, saunasListView } = this.props.sauna;
    const { isLoading } = this.state;
    return (
      <div>
        <SaunaList
          saunas={saunasListView}
          listViewTop={listViewTop}
          onEndReached={this.onEndReached}
          onClickItem={this.onClickItem}
          isLoading={isLoading}/>
      </div>
    );
  }
}
