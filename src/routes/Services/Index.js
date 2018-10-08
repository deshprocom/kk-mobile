import React from 'react'
import { Route, Switch } from 'dva/router';
import ArriveAndDepart from "../../components/services/ArriveAndDepart";
import FastFoods from "./FastFoods";
import PublicServices from "./PublicServices";

export default function ShopIndex() {
  return (
    <Switch>
      <Route path="/services/arrive_and_depart" exact component={ArriveAndDepart} />
      <Route path="/services/fastfood" exact component={FastFoods} />
      <Route path="/services/publicservice" exact component={PublicServices} />
    </Switch>
  )
}
