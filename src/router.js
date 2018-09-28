import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/Index';
import InfoIndex from './routes/Info/Index';
import ExchangeRateIndex from './routes/ExchangeRate/Index';
import HotelsIndex from './routes/Hotels/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/infos" component={InfoIndex} />
        <Route path="/exchange_rates" component={ExchangeRateIndex} />
        <Route path="/hotels" component={HotelsIndex} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
