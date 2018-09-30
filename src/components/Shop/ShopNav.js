import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import classnames from 'classnames';
import styles from './index.less';

export default class ShopNav extends Component {
  render() {
    const {categories, onClick, navId} = this.props;
    const categoriesLayout = categories.map(category => {
      return(
        <div key={category.id}
             onClick={() => onClick(category.id)}
             className={classnames({active: category.id === navId})}
             style={{padding: '10px'}}>
          {category.name}
        </div>
      )
    });
    return (
      <div className={styles.shopNav}>
        <Flex wrap='wrap'>
          {categoriesLayout}
        </Flex>
      </div>
    );
  }
}
