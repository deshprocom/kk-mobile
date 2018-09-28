import React from 'react'
import { Route, Switch } from 'dva/router';
import Picker from "./Picker";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/hotels" exact component={Picker} />
    </Switch>
  )
}
export default InfoIndex
