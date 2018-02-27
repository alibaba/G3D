import React, { Component } from 'react';
import { render } from 'react-dom';

import { debounce, property } from 'lodash';

import Layout from './components/layout';
import Screen from './components/screen';
import Info from './components/info';
import CodeEditor from './components/code-editor';
import Menu from './components/menu';

import './index.less';

import samples from './samples/index';


function getItemPath() {
    const hash = (function () {
        const query = location.hash.substr(1);
        const result = {};
        query.split('&').forEach(function (part) {
            const item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    })();
    return hash.item;
}

const itemPath = getItemPath();


class App extends Component {

    state = {
        code: itemPath ?
            property(['guide', itemPath])(samples) :
            samples['guide']['first-steps'],
        error: null
    };

    componentDidMount() {

        window.addEventListener('hashchange', () => {
            const itemPath = getItemPath();
            this.setState({
                code: property(['guide', itemPath])(samples)
            })
        })
    }

    onCodeChange = debounce((code) => {
        this.setState({ code });
    }, 500);

    onCodeError = error => {
        if (error) {
            this.setState({
                error
            })
        } else {
            this.setState({
                error: null
            })
        }
    }

    onClickMenu = key => {
        if (key.startsWith('guide')) {
            const [scope, item] = key.split('/');
            location.hash = `item=${item}`;
        } else {
            const code = property(key.split('/'))(samples);
            this.setState({ code });
        }
    }

    render() {

        return (
            <Layout>
                <Menu onClick={this.onClickMenu} samples={samples} />
                <Screen sample={this.state.code} onError={this.onCodeError} />
                <Info error={this.state.error} />
                <CodeEditor code={this.state.code} onCodeChange={this.onCodeChange} />
            </Layout>
        )
    }
}






render(<App />, document.getElementById('root'));