import React, {Component} from 'react';
import {connect} from 'dva';
import HomeCarousel from "../../components/indexPage/HomeCarousel";
import HomeCardNav from "../../components/indexPage/HomeCardNav";
import HotRecommends from "../../components/indexPage/HotRecommends";
import HotCatalogs from "../../components/indexPage/HotCatalogs";
import LotteryPage from "../../components/indexPage/LotteryPage";

@connect(({homePage}) => ({
  homePage
}))
export default class HomePage extends Component {
  
  closeLottery = () => {
    this.props.dispatch({
      type: 'homePage/lotteryVisibleToFalse'
    })
  };
  
  render() {
    const {homePage, dispatch} = this.props;
    return (
      <div>
        <HomeCarousel banners={homePage.banners}/>
        <HotCatalogs dispatch={dispatch}/>
        <HomeCardNav dispatch={dispatch}/>
        <HotRecommends recommends={homePage.recommends}/>
        <LotteryPage visible={homePage.lotteryVisible} onClose={this.closeLottery}/>
      </div>
    );
  }
}
