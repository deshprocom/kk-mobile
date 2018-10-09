import React, {Component} from 'react';
import {Flex} from 'antd-mobile';
import classnames from 'classnames';
import styles from './index.less';
import NavBar from '../NavBar'
import {routerRedux} from "dva/router";

export default class ShopNav extends Component {
  render() {
    const {categories, onClick, navId} = this.props;
    const categoriesLayout = categories.map(category => {
      return(
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
        <NavBar title={'商城'} goBack={this.goBack}/>
        <Flex wrap='wrap'>
          {categoriesLayout}
        </Flex>
      </div>
    );
  }
  goBack=()=>{
    this.props.dispatch && this.props.dispatch(routerRedux.goBack());
  }
}
