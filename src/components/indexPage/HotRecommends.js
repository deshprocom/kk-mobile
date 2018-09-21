import React, { Component } from 'react';
import { List } from 'antd-mobile';
const Item = List.Item;

export default class HotRecommends extends Component {
  
  render() {
    const { recommends } = this.props;
    let recommendItems = recommends.map((recommend, index) =>{
      let source_type = recommend.source_type;
      let source_info = recommend[source_type];
      return (
        <Item key={index}>
          {source_info.title}
        </Item>
      )
    }
    );
    return (
      <div>
        <List>
          <Item>热门推荐</Item>
          {recommendItems}
        </List>
      </div>
    );
  }
}
