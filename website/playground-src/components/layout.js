import React, { PropTypes } from 'react';

import {Button} from 'antd';

import './layout.less';


const query = (function () {
    const query = location.search.substr(1);
    const result = {};
    query.split('&').forEach(function (part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
})();
const isEmbed = query.embed;

const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

const style = {
    width, height,
    background: '#ccc'
}
const topStyle = {
    width,
    height: isEmbed ? 0 : 45
}
const rowStyle = {
    width,
    height: style.height - topStyle.height
}
const lStyle = {
    width: isEmbed ? 200 : rowStyle.height * 0.7,
    height: rowStyle.height
}
const rStyle = {
    width: width - lStyle.width,
    height: rowStyle.height
}

const Layout = props => {

    return (
        <div className="layout" style={style}>
            <div className="top" style={{ ...topStyle, overflow: 'hidden' }}>
                {
                    isEmbed ? null : React.cloneElement(props.children[0], { ...topStyle })
                }
            </div>
            <div className="row" style={rowStyle}>
                <div className="left" style={lStyle}>
                    {React.cloneElement(props.children[1], { width: lStyle.width, height: lStyle.width })}
                    {React.cloneElement(props.children[2], { width: lStyle.width, height: lStyle.height - lStyle.width })}
                </div>
                <div className="right" style={rStyle}>
                    {React.cloneElement(props.children[3], { ...rStyle, isEmbed })}
                </div>
                <div className="preview">
                    {isEmbed ? null : null}
                </div>
                {
                    isEmbed ? 
                    <div className="embed-button"><Button target="_blank" href={location.href.replace('?embed', '')} type="dashed">View Full Version</Button></div> : 
                    null
                }
            </div>
        </div>
    )
};

export default Layout;