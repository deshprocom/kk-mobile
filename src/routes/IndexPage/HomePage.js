import React, { Component } from 'react';
import { connect } from 'dva';
import HomeCarousel from "../../components/indexPage/HomeCarousel";
import HomeCardNav from "../../components/indexPage/HomeCardNav";
import HotRecommends from "../../components/indexPage/HotRecommends";
import HotCatalogs from "../../components/indexPage/HotCatalogs";

@connect(({ homePage }) => ({
  homePage
}))
export default class HomePage extends Component {
  state = {
    imgHeight: 176,
  };

  render() {
    const { homePage, dispatch } = this.props;
    return (
      <div>
        <HomeCarousel banners={homePage.banners}/>
        <HotCatalogs dispatch={dispatch}/>
        <HomeCardNav dispatch={dispatch}/>
        <HotRecommends recommends={homePage.recommends} />
      </div>
    );
  }
}
