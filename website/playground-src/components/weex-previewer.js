import React, { PropTypes, Component } from 'react';
import { Button } from 'antd';

// import requestPreview from '../lib/weex-preview';

import './weex-previewer.less';

class Previewer extends Component {

  static propTypes = {};

  state = {
    loading: false
  };

  componentDidMount() { }

  clickPreview = () => {
    const code = this.props.code;
    if (this.props.canPreview) {
      this.setState({
        loading: true
      })
      requestPreview(code, this.refs.qrcode, ()=>{
        this.setState({
          loading: false
        })
      });
    }
  }

  render() {
    return (
      <div className="weex-previewer">
        <Button type="primary" disabled={!this.props.canPreview} onClick={this.clickPreview}>Preview in Weex</Button>
        <div>
          <canvas style={{opacity: this.state.loading ? 0.5:1}} width={150} height={150} ref="qrcode" />
        </div>
        <div>{this.state.loading ? '生成比较慢(约15秒)请等待' : '下载轻舟 App 扫码查看'}</div>
      </div>
    )
  }
}

export default Previewer;