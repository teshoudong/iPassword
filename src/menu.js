import React from 'react';
import SettingModal from './settingModal';
import './menu.scss';

class Menu extends React.Component {
    updateSetting() {

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
                </div>
                <SettingModal ref={modal => this.settingModal = modal} onOk={() => this.updateSetting()}/>
            </div>
        );
    }
}

export default Menu;