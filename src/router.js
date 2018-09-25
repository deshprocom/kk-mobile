import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/Index';
import InfoIndex from './routes/Info/Index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/infos" component={InfoIndex} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
