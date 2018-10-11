import React from 'react'
import { Route, Switch } from 'dva/router';
import Infos from "./Infos";
import Info from "./Info";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/infos" exact component={Infos} />
      <Route path="/infos/:id" exact component={Info} />
    </Switch>
  )
}
export default InfoIndex
