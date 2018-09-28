import React, { Component } from 'react';
import { Calendar } from 'antd-mobile';
import styles from './index.less';

export default class HotelCalendar extends Component {
  render() {
    const { show, onCancel, onConfirm } = this.props;
    const now = new Date();
  
    return (
      <div className={styles.hotelCalendar}>
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
