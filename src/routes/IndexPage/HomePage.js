import React, { Component } from 'react';
import { connect } from 'dva';
import HomeCarousel from "../../components/indexPage/HomeCarousel";
import HomeCardNav from "../../components/indexPage/HomeCardNav";
import HotRecommends from "../../components/indexPage/HotRecommends";
@connect(({ homePage }) => ({
  homePage
}))
export default class HomePage extends Component {
  state = {
    imgHeight: 176,
  };
  
  render() {
    console.log(this.props);
    const { homePage } = this.props;
  
    return (
      <div>
        <HomeCarousel banners={homePage.banners}/>
        <HomeCardNav/>
        <HotRecommends recommends={homePage.recommends} />
      </div>
    );
  }
}
