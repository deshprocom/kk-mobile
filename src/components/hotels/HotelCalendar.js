import React, { Component } from 'react';
import { Calendar } from 'antd-mobile';

export default class HotelCalendar extends Component {
  render() {
    const { show, onCancel, onConfirm } = this.props;
    const now = new Date();
  
    return (
      <div>
        <Calendar
          defaultDate={now}
          visible={show}
          minDate={now}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      </div>
    );
  }
}
