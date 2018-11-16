import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage/Index';
import InfoIndex from './routes/Info/Index';
import ExchangeRateIndex from './routes/ExchangeRate/Index';
import HotelsIndex from './routes/Hotels/Index';
import TopicIndex from './routes/Topic/Index';
import ShopIndex from './routes/Shop/Index';
import servicesIndex from './routes/Services/Index';
import WebView from "./components/WebView";
import VisaInfoPage from "./components/VisaInfoPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/homepage" component={IndexPage} />
        <Route path="/infos" component={InfoIndex} />
        <Route path="/exchange_rates" component={ExchangeRateIndex} />
        <Route path="/hotels" component={HotelsIndex} />
        <Route path="/topics" component={TopicIndex} />
        <Route path="/shop" component={ShopIndex} />
        <Route path="/services" component={servicesIndex} />
        <Route path="/web_view/:type" component={WebView} />
        <Route path="/visa" component={VisaInfoPage} />
        <Redirect exact from="/" to='/homepage' />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
