import React from 'react';
import './menu.scss';

class Menu extends React.Component {
    render() {
        return (
            <div className="pw-menu">
                <div className="menu-logo">iPassword</div>
                <div className="menu-list">
                    <div className="menu-item active">所有项目</div>
                </div>
                <div className="menu-button">
                    <div className="menu-setting"></div>
                </div>
            </div>
        );
    }
}

export default Menu;