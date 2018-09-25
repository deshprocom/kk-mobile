import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage/Index';
import Info from './routes/Info';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/infos/:id" exact component={Info} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
