import React from 'react'
import { Route, Switch } from 'dva/router';
import Picker from "./Picker";
import Search from "./Search";
import Hotel from "./Hotel";

function InfoIndex() {
  return (
    <Switch>
      <Route path="/hotels" exact component={Picker} />
      <Route path="/hotels/search" exact component={Search} />
      <Route path="/hotels/:id" exact component={Hotel} />
    </Switch>
  )
}
export default InfoIndex
