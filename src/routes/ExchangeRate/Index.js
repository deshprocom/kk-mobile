import React from 'react'
import { Route, Switch } from 'dva/router';
import RealTime from "./RealTime";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/exchange_rates" exact component={RealTime} />
    </Switch>
  )
}
export default InfoIndex
