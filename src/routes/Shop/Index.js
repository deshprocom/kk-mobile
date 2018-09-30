import React from 'react'
import { Route, Switch } from 'dva/router';
import ShopHome from "./ShopHome";
import Product from "./Product";

export default function ShopIndex() {
  return (
    <Switch>
      <Route path="/shop" exact component={ShopHome} />
      <Route path="/shop/products/:id" exact component={Product} />
    </Switch>
  )
}
