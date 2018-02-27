import React, { PropTypes, Component } from 'react';
import './info.less';

class Info extends Component {

    componentDidMount() { }

    render() {
        const { error, width, height } = this.props;
        const style = {
            width, height,
            background: !error ? '#2ecc71' : '#f1c40f'
        };

        return (
            <div className="info" style={style}>
                {
                    error ? error.toString() : 'Great, everything is fine.'
                }
            </div>
        )
    }
}

export default Info;