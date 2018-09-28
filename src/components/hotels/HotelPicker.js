import React, { Component } from 'react';
import moment from 'moment';
import { WingBlank, Card, List } from 'antd-mobile';
import {Link} from 'dva/router';
import HotelCalendar from "./HotelCalendar";
import styles from './index.less';

const Item = List.Item;
export default class HotelPicker extends Component {
  constructor(props) {
    super(props);
    const checkinDate = moment();
    const checkoutDate = moment().add(1, 'days');
    this.state = {
      checkinDate,
      checkoutDate,
      showCalendar: false,
    };
  }
  
  itemOnclick = () => {
    this.setState({ showCalendar: true });
  };
  
  onConfirm = (startTime, endTime) => {
    this.setState({
      showCalendar: false,
      checkinDate: moment(startTime),
      checkoutDate: moment(endTime),
    });
  };
  
  onCancel = () => {
    this.setState({
      showCalendar: false,
    });
  };
  
  formatDate = (date) => { return date.format('YYYY-MM-DD') };
  
  render() {
    const { checkinDate, checkoutDate, showCalendar } = this.state;
    const diffDay = checkoutDate.diff(checkinDate, 'days');
    return (
      <div>
        <WingBlank size='md'>
          <Card>
            <div>位置：澳门</div>
            <div className={styles.dateShow}>
              <List>
                <Item extra={`共${diffDay}晚`} arrow="horizontal" wrap={true}
                      onClick={this.itemOnclick}>
                  <span style={{marginRight: 15}}>
                    {checkinDate.format('MMMDo')}
                    <span className={styles.wdayShow}>{checkinDate.format('ddd')}入住</span>
                  </span>
  
                  <span>
                    {checkoutDate.format('MMMDo')}
                    <span className={styles.wdayShow}>{checkoutDate.format('ddd')}离店</span>
                  </span>
                </Item>
              </List>
            </div>
            <div>
              <Link to={`/hotels/search?checkinDate=${this.formatDate(checkinDate)}&checkoutDate=${this.formatDate(checkoutDate)}`}>
                开始搜索
              </Link>
            </div>
          </Card>
        </WingBlank>
        <HotelCalendar show={showCalendar} onCancel={this.onCancel} onConfirm={this.onConfirm}/>
      </div>
    );
  }
}
