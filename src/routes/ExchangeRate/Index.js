import React from 'react'
import { Route, Switch } from 'dva/router';
import RealTime from "./RealTime";
import LocalRate from "./LocalRate";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/exchange_rates" exact component={RealTime} />
      <Route path="/exchange_rates/local" exact component={LocalRate} />
    </Switch>
  )
}
export default InfoIndex
