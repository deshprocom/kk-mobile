import React from 'react'
import { Route, Switch } from 'dva/router';
import ShopHome from "./ShopHome";

export default function ShopIndex() {
  return (
    <Switch>
      <Route path="/shop" exact component={ShopHome} />
    </Switch>
  )
}
