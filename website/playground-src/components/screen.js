import React, { PropTypes, Component } from 'react';

import runPlayground from '../lib/run';

class Screen extends Component {

    static propTypes = {};

    state = {};

    componentDidMount() {
        this.runPlayground();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sample !== this.props.sample) {
            this.stop();
            this.runPlayground();
        }
    }

    runPlayground() {
        try {
            this.stop = runPlayground(this.props.sample, this.refs.canvas, this.props.onError);
            this.props.onError(null);
        } catch (e) {
            this.props.onError(e);
        }
    }

    render() {

        const { width, height } = this.props;

        const style = {
            width, height,
            background: '#fff'
        }

        return (
            <div style={{ ...style }}>
                <canvas ref="canvas" width={width} height={height} style={style} />
            </div>
        )
    }
}

export default Screen;