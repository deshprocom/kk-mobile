import React from 'react'
import { Route, Switch } from 'dva/router';
import Topic from "./Topic";

export default function TopicIndex() {
  return (
    <Switch>
      <Route path="/topics/:id" exact component={Topic} />
    </Switch>
  )
}
