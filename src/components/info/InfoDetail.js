import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {strNotNull, getDateDiff} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from './index.less';
import Comments from "./Comments";
import GoBack from "../GoBack";

export default class InfoDetail extends Component {


  render() {
    const {infoDetail, info_comments} = this.props;
    return (
      <Card>
        <GoBack title={infoDetail.title}/>
        <Card.Header
          title={infoDetail.title}
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        />
        <Card.Body>
          <div className="renderHtmlData"
               dangerouslySetInnerHTML={{__html: infoDetail.description}}/>
        </Card.Body>

        <Card.Footer content={this.content(infoDetail,info_comments)}>
        </Card.Footer>
      </Card>
    );
  };

  content = (infoDetail,info_comments) => {
    return <Comments detail={infoDetail} comments={info_comments} total_comments={infoDetail.comments_count}/>
  }
}
