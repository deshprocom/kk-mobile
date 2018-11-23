import React, { Component } from 'react';
import HomePage from "./HomePage";
import Discovery from "./Discovery";
import { Route, Switch } from 'dva/router';
import HomeTabBar from "../../components/indexPage/HomeTabBar";
import LoadApp from "../../components/indexPage/LoadApp";

export default class IndexPage extends Component {

  render() {
    const { location } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/homepage" exact component={HomePage} />
          <Route path="/homepage/discovery" exact component={Discovery} />
          <Route path="/homepage/loadApp" exact component={LoadApp} />
        </Switch>
        <HomeTabBar currentPath={location.pathname}/>
      </div>
    );
  }
}
