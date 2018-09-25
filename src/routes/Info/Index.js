import React from 'react'
import { Route, Switch } from 'dva/router';
import Info from "./Info";

function InfoIndex(props) {
  return (
    <Switch>
      <Route path="/infos/:id" exact component={Info} />
    </Switch>
  )
}
export default InfoIndex
