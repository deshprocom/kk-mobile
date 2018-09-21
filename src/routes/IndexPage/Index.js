import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import HomePage from "./HomePage";

export default class TabBarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'homePage',
      hidden: false,
    };
  }
  
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#E54A2E"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="首页"
            key="homePage"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'homePage'}
              onPress={() => {
              this.setState({
                selectedTab: 'homePage',
              });
            }}
          >
            <HomePage />
          </TabBar.Item>
          <TabBar.Item
            title="发现"
            key="discovery"
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            selected={this.state.selectedTab === 'discovery'}
            onPress={() => {
              this.setState({
                selectedTab: 'discovery',
              });
            }}
          >
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
