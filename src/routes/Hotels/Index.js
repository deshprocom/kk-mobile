import React from 'react'
import { Route, Switch } from 'dva/router';
import Picker from "./Picker";
import Search from "./Search";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/hotels" exact component={Picker} />
      <Route path="/hotels/search" exact component={Search} />
    </Switch>
  )
}
export default InfoIndex
