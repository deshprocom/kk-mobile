import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {strNotNull, getDateDiff, isEmptyObject, logMsg} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from './index.less';
import Comments from "./Comments";
import GoBack from "../GoBack";

export default class InfoDetail extends Component {

  state = {
    index: 0,
    max: false,
    src: ''
  }

  componentWillReceiveProps(nextProps) {
    const {infoDetail} = nextProps;
    if(isEmptyObject(infoDetail)){
      return;
    }
    const {description} = infoDetail;
    let imgs = description.match(/<\W*img[^>]*>/ig);
    imgs.map((image, index) => {
      image.onClick = () => {
        this.setState({
          max: true,
          index: index,
          image: image.src
        })
      }
    })
  }


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
               id="renderHtmlData"
               dangerouslySetInnerHTML={{__html: infoDetail.description}}/>
        </Card.Body>

        <Card.Footer content={this.content(infoDetail, info_comments)}>
        </Card.Footer>

        {this.state.max && strNotNull(this.state.src) ? <div style={{
          backgroundColor: 'rgb(20,20,20)',
          position: 'fixed',
          zIndex: 999,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          display: 'flex'

        }}
                                                                onClick={() => {
                                                                  this.setState({
                                                                    max: false
                                                                  })
                                                                }}>
          <img style={{width: '100%', height: 'auto', alignSelf: 'center'}}
               src={this.state.src}/>
        </div> : null}

      </Card>
    );
  };

  content = (infoDetail, info_comments) => {
    return <Comments detail={infoDetail} comments={info_comments} total_comments={infoDetail.comments_count}/>
  }
}
