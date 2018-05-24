import React from 'react';
import PropTypes from 'prop-types';
import SettingModal from './settingModal';
import './menu.scss';

class Menu extends React.Component {
    updateSetting() {
        this.settingModal.hide();
    }

    handleSetting() {
        this.settingModal.show();
    }

    render() {
        return (
            <div className="pw-menu">
                <div className="menu-logo">iPassword</div>
                <div className="menu-list">
                    <div className="menu-item active">所有项目</div>
                </div>
                <div className="menu-button">
                    <div className="menu-setting" onClick={() => this.handleSetting()}></div>
                    <div className="menu-lock" onClick={() => this.props.onLock()}></div>
                </div>
                <SettingModal ref={modal => this.settingModal = modal} onOk={() => this.updateSetting()}/>
            </div>
        );
    }
}

Menu.defaultProps = {
    onLock: () => {}
};

Menu.propTypes = {
    onLock: PropTypes.func
};

export default Menu;