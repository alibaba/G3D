import React, { PropTypes, Component } from 'react';
import { Menu, Icon, Modal, Button } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class AppMenu extends Component {

    static propTypes = {};

    state = {
        showingAbout: false,
        showingNewDialog: false
    };

    componentDidMount() { }

    onClickMenuItem = data => {
        switch (data.key) {
            case 'about':
                this.setState({ showingAbout: true });
                break;
            default:
                this.props.onClick(data.key);
        }
    }

    onCloseMenu = () => {
        this.setState({
            showingAbout: false,
            showingNewDialog: false
        })
    }

    renderSamples(samples = this.props.samples, keyChain = []) {
        return Object.keys(samples).map(
            key => {
                const sample = samples[key];
                if (typeof sample === 'string') {
                    return <Menu.Item key={`${[...keyChain, key].join('/')}`}>{key}</Menu.Item>
                } else if (typeof sample === 'object') {
                    return <SubMenu title={key} key={`${[...keyChain, key].join('/')}`}>{this.renderSamples(sample, [...keyChain, key])}</SubMenu>
                }
            }
        );
    }

    render() {

        return (
            <div>
                <Menu
                    onClick={this.onClickMenuItem}
                    mode="horizontal"
                >
                    <Menu.Item key="about"><Icon type="setting" />About</Menu.Item>
                    <SubMenu title={<span><Icon type="setting" />Storage</span>}>
                        <Menu.Item disabled key="setting:2">New Playground</Menu.Item>
                        <SubMenu title={'Load Examples'}>
                        </SubMenu>
                        <SubMenu title={'Sample Examples'}>
                            {this.renderSamples()}
                        </SubMenu>
                        <Menu.Item disabled key="save">Save Work</Menu.Item>
                    </SubMenu>
                </Menu>

                <Modal
                    visible={this.state.showingAbout}
                    title="About G3D Playground"
                    onOk={this.onCloseMenu}
                    onCancel={this.onCloseMenu}
                    footer={[
                        <Button key="submit" onClick={this.onCloseMenu}>
                            Close
                        </Button>
                    ]}
                    width={800}
                >
                    <div>
                        Hello G3D.
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AppMenu;