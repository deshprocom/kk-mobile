import React, { Component } from 'react';
import { connect } from 'dva';
import Topics from "../../components/indexPage/Topics";

@connect(({ topic }) => ({
  topic
}))
export default class Discovery extends Component {
  render() {
    return (
      <div>
        <Topics topics={this.props.topic.topics} dispatch={this.props.dispatch}/>
      </div>
    );
  }
}
