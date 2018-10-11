import React, { Component } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import HotelDetail from "../../components/hotels/HotelDetail";

@connect(({ hotel }) => ({
  hotel
}))
export default class Hotel extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(props.location.search);

    this.state = {
      checkinDate: params.checkinDate,
      checkoutDate: params.checkoutDate,
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.props.dispatch({
      type: 'hotel/fetchHotelDetail',
      payload: { id: params.id, date: this.state.checkinDate },
    });
  }

  render() {
    const { hotelDetail } = this.props.hotel;
    return (
      <div>
        {hotelDetail && <HotelDetail hotel={hotelDetail} dispatch={this.props.dispatch}/>}
      </div>
    );
  }
}
