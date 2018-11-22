import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import classnames from 'classnames';
import styles from './index.less';
import GoBack from '../GoBack'

export default class ShopNav extends Component {
  render() {
    const {categories, onClick, navId} = this.props;
    const categoriesLayout = categories.map(category => {
      return(
        // 用== 不用 ===， 因为navId有可能是字母串
        <div key={category.id}
             onClick={() => onClick(category.id)}
             style={{padding: '10px',fontSize:14}}
             className={classnames({active: category.id === navId})}>
          {category.name}
        </div>
      )
    });
  
    return (
      <div className={styles.shopNav}>
        <GoBack title={'商城'} goBackPath='/'/>
        <Flex wrap='wrap'>
          {categoriesLayout}
        </Flex>
      </div>
    );
  }
}
