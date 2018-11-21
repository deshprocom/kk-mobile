import React from 'react'
import { Route, Switch } from 'dva/router';
import Saunas from "./Saunas";
import Sauna from "./Sauna";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/saunas" exact component={Saunas} />
      <Route path="/saunas/:id" exact component={Sauna} />
    </Switch>
  )
}
export default InfoIndex
