import React, {Component} from 'react';
import {List,InputItem} from 'antd-mobile';
import {Link} from 'dva/router';
import styles from './index.less';
import {strNotNull, div, utcDate, mul, formatCurrency, isEmptyObject} from '../../utils/utils';
import {Images} from '../../Thems';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

export default class RateInfo extends Component {

  state = {
    receiving_rate: {},
    price_changed: [{id: 0, img: Images.cny, abb: 'CNY', name: '人民币¥', price2: 0, price: '', showTrue: true},
      {id: 1, img: Images.hkd, abb: 'HKD', name: '港币$', price2: 0, price: '', showTrue: false},
      {id: 2, img: Images.mop, abb: 'MOP', name: '澳门币$', price2: 0, price: '', showTrue: false}],
    show: false
  };

  componentDidMount() {
    let rate = [100, 0, 0];
    const {price_changed} = this.state;
    const {type, exchangeRate} = this.props;
    if(isEmptyObject(exchangeRate)){
      return;
    }
    rate[1] = mul(exchangeRate.cny_to_hkd_rate.rate, rate[0]);
    rate[2] = mul(exchangeRate.cny_to_mop_rate.rate, rate[0]);
    let group2 = price_changed;
    group2.map((item, index) => {
      item.price2 = rate[index]
    });

    this.setState({
      price_changed: group2
    });
    console.log("price_changed:", group2);
    if (type === 'real_time' && strNotNull(exchangeRate.cny_to_hkd_rate.updated_at)) {
      this.props.change_time(utcDate(exchangeRate.cny_to_hkd_rate.updated_at, 'yyyy-MM-dd hh:mm:ss'))
    }

  }

  render() {
    const {price_changed, show} = this.state;
    const {exchangeRate} = this.props;
    if(isEmptyObject(exchangeRate)){
      return (
        <div/>
      )
    }
    const {cny_to_hkd_rate, cny_to_mop_rate} = exchangeRate;
    return (
      <div className={styles.rateInfoPage}>
        <div className={styles.page}>
          <span className={styles.txt} style={{marginLeft:17,marginRight:17}}>今日汇率：</span>
          <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center'}}>
            <span
              className={styles.txt}>{`1人民币=${cny_to_hkd_rate.rate}港币，1港币=${div(1, cny_to_hkd_rate.rate).toFixed(4)}人民币`}</span>
            <span
              className={styles.txt} style={{marginTop: 5}}>{`1人民币=${cny_to_mop_rate.rate}澳门币，1澳门币=${div(1, cny_to_mop_rate.rate).toFixed(4)}人民币`}</span>
          </div>

        </div>

        {this.props.type === 'local' ?
          <div className={styles.page3}>
            <span className={styles.txt} style={{marginTop: 5,backgroundColor: '#F3F3F3'}}>
              更新时间：{utcDate(cny_to_hkd_rate.updated_at, 'yyyy-MM-dd hh:mm:ss')}
            </span>
          </div>: null}

        {price_changed.map((item, index) => {
          return (
            <div style={{display:'flex',flexDirection: 'column',marginLeft: 17, marginRight: 17}} key={index}>
              <div className={styles.itemPage} key={index}>
                <img className={styles.img} src={item.img}/>
                <span className={styles.abb}>{item.abb}</span>
                <div style={{display: 'flex', flex: 1}}/>

                <div className={styles.inputView}>
                  <InputItem
                    style={{borderBottomWidth:0,borderBottom:'none',textAlign:'right'}}
                    type="digit"
                    placeholder={strNotNull(item.price) ? '' : item.price2 + ''}
                    onChange={(input) => {
                      this.state.show = true;
                      this.changing_price(item, index, input)
                    }}
                    onFocus={() => {
                      this.clean_txt()
                    }}
                    value={item.price + ''}
                    moneyKeyboardAlign={'right'}
                    maxLength={11}
                    moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                  />
                  <span className={styles.nameSpan}>{item.name}</span>
                </div>
              </div>
              <div style={{height: 1.5, width: '100%', backgroundColor: "#F3F3F3"}}/>
            </div>
          )
        })}
      </div>
    )
  }

  changing_price = (item, index, txt) => {
    const {price_changed} = this.state;
    const {cny_to_hkd_rate, cny_to_mop_rate} = this.props.exchangeRate;
    let group2 = price_changed;
    let rate = [0, 0, 0];

    if (index === 0) {
      if (this.isZero(txt)) {
        rate[0] = 0.00;
        rate[1] = 0.00;
        rate[2] = 0.00
      } else {
        rate[0] = txt;
        rate[1] = mul(rate[0], cny_to_hkd_rate.rate);
        rate[2] = mul(rate[0], cny_to_mop_rate.rate);
        rate[1] = formatCurrency(rate[1]);
        rate[2] = formatCurrency(rate[2]);
      }

    } else if (index === 1) {
      if (this.isZero(txt)) {
        rate[0] = 0.00;
        rate[1] = 0.00;
        rate[2] = 0.00
      } else {
        rate[1] = txt;
        rate[0] = div(rate[1], cny_to_hkd_rate.rate);
        rate[2] = mul(rate[0], cny_to_mop_rate.rate);
        rate[0] = formatCurrency(rate[0]);
        rate[2] = formatCurrency(rate[2]);
      }

    } else if (index === 2) {
      if (this.isZero(txt)) {
        rate[0] = 0.00;
        rate[1] = 0.00;
        rate[2] = 0.00
      } else {
        rate[2] = txt;
        rate[0] = div(rate[2], cny_to_mop_rate.rate);
        rate[1] = mul(rate[0], cny_to_hkd_rate.rate);
        rate[0] = formatCurrency(rate[0]);
        rate[1] = formatCurrency(rate[1]);
      }

    }
    group2.map((x, index) => {
      x.price = rate[index]
    });
    this.setState({
      price_changed: group2
    })
    console.log("price_changed:", group2)
  };

  isZero = (price) => {
    if (price === 0.00 || price === 0.0 || price === 0 || price === '0.00' || price === '0.0' || price === '0') {
      return true
    } else {
      return false
    }
  };

  clean_txt = () => {
    let rate = [100, 0, 0];
    const {price_changed} = this.state;
    const {exchangeRate} = this.props;
    rate[1] = mul(exchangeRate.cny_to_hkd_rate.rate, rate[0]);
    rate[2] = mul(exchangeRate.cny_to_mop_rate.rate, rate[0]);

    let group2 = price_changed;
    group2.map((x, index) => {
      x.price = '';
      x.price2 = rate[index]
    });
    this.setState({
      price_changed: group2
    })
  };
}
