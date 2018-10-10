import React, {Component} from 'react';
import {Images} from "../Thems";
import {strNotNull} from "../utils/utils";
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import GoBack from "./GoBack";

export default class WebView extends Component {

  state = {
    title: '',
    src: ''
  };

  componentDidMount() {
    const {type} = this.props.match.params;
    let title = this.state.title;
    let src = this.state.src;
    if (type === 'ex') {
      title = '出入境';
      src = 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx'
    } else if (type === 'weather') {
      title = '天气';
      src = 'http://wx.weather.com.cn/mweather/101330101.shtml#1'
    }
    this.setState({
      title,
      src
    })
  }

  render() {
    const {title, src} = this.state;
    if (strNotNull(title) || strNotNull(src)) {
      return (
        <div style={{
          width: window.screen.availWidth,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          paddingBottom: 50
        }}>
          <GoBack title={this.state.title}/>
          <iframe style={{border: 0, marginTop:0,width: window.screen.availWidth, height: window.screen.availHeight}}
                  src={this.state.src}/>
        </div>
      )
    } else {
      return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        </div>
      )
    }

  }
}
