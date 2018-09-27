import React, { Component } from 'react';
import { Card } from 'antd-mobile';

export default class InfoDetail extends Component {
  render() {
    const { infoDetail } = this.props;

    return (
      <Card>
        <Card.Header
          title={infoDetail.title}
          style={{display:'flex',flexDirection:'column',alignItems:'center'}}
        />
        <Card.Body>
          <div className="renderHtmlData"
               dangerouslySetInnerHTML={{__html: infoDetail.description}} />
        </Card.Body>
      </Card>
    );
  }
}
