import React, {Component} from 'react';
import moment from 'moment';
import {WingBlank, Card, List} from 'antd-mobile';
import {Link} from 'dva/router';
import HotelCalendar from "./HotelCalendar";
import styles from './index.less';
import {Images} from '../../Thems'

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
  };

  componentDidMount() {
    document.title = "选择入住时间"
  }

  itemOnclick = () => {
    this.setState({showCalendar: true});
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

  formatDate = (date) => {
    return date.format('YYYY-MM-DD')
  };

  line = () => {
    return <div style={{width: '90%', height: 1, backgroundColor: "#F3F3F3"}}/>;
  };

  render() {
    const {checkinDate, checkoutDate, showCalendar} = this.state;
    const diffDay = checkoutDate.diff(checkinDate, 'days');
    return (
      <div className={styles.selectTimePage}>
        <WingBlank size='md' className={styles.timeView} style={{shadowOffset: {width: 2, height: 2}}}>
          <Card style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span className={styles.location}>位置：澳门</span>
            {this.line()}
            <div className={styles.dateShow}
                 onClick={this.itemOnclick}>
              <span style={{marginRight: 15}} className={styles.txt1}>
                    {checkinDate.format('MMMDo')}
                <span className={styles.wdayShow}>{checkinDate.format('ddd')}入住</span>
              </span>

              <span className={styles.txt1}>
                    {checkoutDate.format('MMMDo')}
                <span className={styles.wdayShow}>{checkoutDate.format('ddd')}离店</span>
                  </span>

              <div style={{display: 'flex', flex: 1}}/>

              <span className={styles.wdayShow} style={{marginLeft: 5}}>{`共${diffDay}晚`}</span>
              <img className={styles.right} src={Images.right}/>
            </div>
            {this.line()}
            <Link
              to={`/hotels/search?checkinDate=${this.formatDate(checkinDate)}&checkoutDate=${this.formatDate(checkoutDate)}`}
              className={styles.searchView} style={{shadowOffset: {width: 2, height: 2}}}>
              开始搜索
            </Link>
          </Card>
        </WingBlank>
        <HotelCalendar show={showCalendar} onCancel={this.onCancel} onConfirm={this.onConfirm}/>
      </div>
    );
  }
}
