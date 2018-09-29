import React, { Component } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import moment from 'moment';
import HotelCalendar from "../../components/hotels/HotelCalendar";
import HotelNav from "../../components/hotels/HotelNav";
import Hotels from "../../components/hotels/Hotels";

@connect(({ hotel }) => ({
  hotel
}))
export default class Search extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(this.props.location.search);
    this.state = {
      showCalendar: false,
      checkinDate: moment(params.checkinDate),
      checkoutDate: moment(params.checkoutDate),
      isLoading: true,
      hasMore: true,
      isClearData: false,
      hotelsData: [],
      searchParams: {
        date: params.checkinDate,
        page: 1,
        page_size: 20,
        keyword: '',
        region: '',
        order: 'price_asc',
      },
    };
  }
  
  componentDidMount() {
    this.fetchHotels(this.state.searchParams);
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { hotels } = nextProps.hotel;
    const hasMore = hotels.size === this.state.searchParams.page_size;
    const hotelsData = this.state.hotelsData.concat(hotels);
    this.setState({
      isLoading: false,
      hasMore,
      hotelsData
    });
  }
  
  onCancel = () => {
    this.setState({
      showCalendar: false,
    });
  };
  
  clickShowCalendar = () => {
    this.setState({
      showCalendar: true,
    });
  };
  
  onConfirm = (startTime, endTime) => {
    const checkinDate = moment(startTime);
    const checkoutDate = moment(endTime);
    const newSearchParams = {
      ...this.state.searchParams,
      date: checkinDate.format('YYYY-MM-DD'),
    };
    this.setState({
      showCalendar: false,
      checkinDate: checkinDate,
      checkoutDate: checkoutDate,
      hasMore: true,
      isLoading: true,
      hotelsData: [],
      searchParams: newSearchParams,
    });
    
    this.fetchHotels(newSearchParams);
  };
  
  changeKeyword = (val) => {
    const newSearchParams = {...this.state.searchParams, keyword: val};
  
    this.setState({
      searchParams: newSearchParams,
      isLoading: true,
      hasMore: true,
      hotelsData: [],
    });
    this.fetchHotels(newSearchParams);
  };
  
  onEndReached = () => {
    console.log('onEndReached');
    if (!this.state.hasMore) return;
    
    const { searchParams } = this.state;
    const newSearchParams = {...searchParams, page: searchParams.page++};
    this.setState({
      searchParams: newSearchParams,
      isLoading: true
    });
    this.fetchHotels(newSearchParams);
  };
  
  fetchHotels = (searchParams) => {
    this.props.dispatch({
      type: 'hotel/fetchHotels',
      payload: searchParams
    })
  };
  
  render() {
    const { checkinDate, checkoutDate, showCalendar, isLoading } = this.state;
  
    return (
      <div>
        <HotelNav checkinDate={checkinDate} checkoutDate={checkoutDate}
                  dispatch={this.props.dispatch}
                  onClick={this.clickShowCalendar}
                  changeKeyword={this.changeKeyword}
        />
        <Hotels hotels={this.state.hotelsData}
                isLoading={isLoading}
                checkinDate={checkinDate}
                checkoutDate={checkoutDate}
                onEndReached={this.onEndReached}/>
        <HotelCalendar show={showCalendar} onCancel={this.onCancel} onConfirm={this.onConfirm}/>
      </div>
    );
  }
}
