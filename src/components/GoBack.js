import React, {Component} from 'react';
import {Images} from "../Thems";
import {strNotNull} from "../utils/utils";
import { connect } from 'dva';
import {routerRedux} from 'dva/router';

@connect()
export default class GoBack extends Component {
  goBack=()=>{
    this.props.dispatch(routerRedux.goBack());
  };
  
  render() {
    const {title} = this.props;
    return (
      <div style={{marginBottom:50}}>
        <div
          style={{
            height: 50,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'fixed',
            zIndex:99,
            backgroundColor: 'rgba(229,74,46,' + 1 + ')'
          }}>
          <img onClick={this.goBack}
               style={{
                 marginLeft: 17,
                 height: 19,
                 width: 10
               }}
               src={Images.sign_retrun}/>
          <div style={{display:'flex',flex:1}}/>
          {strNotNull(title) ? <span style={{color: 'white', fontSize: 15}}>{title}</span> : null}
          <div style={{display:'flex',flex:1}}/>
          <div style={{marginRight:17}}/>
        </div>
      </div>
    );
  }
}
