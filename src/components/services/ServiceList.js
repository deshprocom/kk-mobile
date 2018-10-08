import React, { Component } from 'react';
import {List} from "antd-mobile";
const Item = List.Item;

export default class ServiceList extends Component {

  render() {
    const { items } = this.props;
    const itemsLayout = items.map((item, index) => {
      return(
        <Item key={index}>
          {item.title}
        </Item>
      )
    });
    
    return(
      <div>
        <List>
          {itemsLayout}
        </List>
      </div>
    );
  }
}
