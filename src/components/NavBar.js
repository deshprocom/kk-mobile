import React, {Component} from 'react';
import {routerRedux} from "dva/router";
import {Images} from "../Thems";
import {strNotNull} from "../utils/utils";

export default class NavBar extends Component {
  render() {
    const {title} = this.props;
    return (
      <div
        style={{
          height: 50,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 99,
          position: 'fixed',
          backgroundColor: 'rgba(229,74,46,' + 1 + ')'
        }}>
        <img onClick={() => this.props.goBack && this.props.goBack()}
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
    );
  }
}