import React, { Component } from 'react';
import {List} from "antd-mobile";
import styles from './index.less'
import GoBack from "../GoBack";
import {Images} from '../../Thems'

const Item = List.Item;

export default class ServiceList extends Component {

  render() {
    const { items, type } = this.props;
    const itemsLayout = items.map((item, index) => {
      return(
        <Item key={index}>
          <div style={{
            width:'100%',
            display:'flex',
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: 'center',
            backgroundColor: 'white'
          }}>
            <div style={{display:'flex',flexDirection: 'column', width: '80%'}}>
              <span className={styles.txt4}>{item.title}</span>
              <span className={styles.txt1} style={{marginTop: 6}}>{item.telephone}</span>
            </div>
            <div style={{display:'flex',flex: 1}}/>
            <div onClick={() => {

            }}>
              <img className={styles.img} src={Images.navigation2.hotline}/>
            </div>
          </div>
        </Item>
      )
    });

    return(
      <div className={styles.total_page}>
        <GoBack title={type === 'fastFoods' ? '快餐热线' : '便民电话'}/>
        <List style={{marginTop:50,paddingBottom:80}}>
          {itemsLayout}
        </List>
      </div>
    );
  }
}
