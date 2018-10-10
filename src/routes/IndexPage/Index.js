import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import HomePage from "./HomePage";
import Discovery from "./Discovery";
import queryString from 'query-string';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    const params = queryString.parse(props.location.search);
  
    this.state = {
      selectedTab: params.tab || 'homePage',
      hidden: false,
    };
  }

  render() {
    const urlState = {title:'', url: window.location.href};
  
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#E54A2E"
          barTintColor="white"
          tabBarPosition="bottom"
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="首页"
            key="homePage"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(http://kkh5.deshpro.com/images/gray_home.png) center center /  21px 21px no-repeat` }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(http://kkh5.deshpro.com/images/red_home.png) center center /  21px 21px no-repeat` }}
            />
            }
            selected={this.state.selectedTab === 'homePage'}
              onPress={() => {
                this.setState({ selectedTab: 'homePage' });
                window.history.pushState(urlState, '','?tab=homePage');
              }}
          >
            <HomePage />
          </TabBar.Item>
          <TabBar.Item
            title="澳门圈"
            key="discovery"
            icon={{uri:'http://kkh5.deshpro.com/images/gray_explore.png'}}
            selectedIcon={{uri:'http://kkh5.deshpro.com/images/red_explore.png'}}
            selected={this.state.selectedTab === 'discovery'}
            onPress={() => {
              this.setState({ selectedTab: 'discovery' });
              window.history.pushState(urlState, '','?tab=discovery');
            }}
          >
            <Discovery/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
