import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './settingModal.scss';
import Modal from './modal';
import storage from './storage';
import encrypt from './encrypt';

class SettingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    show(item) {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }

    handleSubmit() {
        this.props.onOk();
    }

    render() {
        return (
            <Modal ref={modal => this.modal = modal} title="设置" onOk={() => this.handleSubmit()} onCancel={() => this.props.onCancel()}>
                <div className="pw-settingModal"></div>
            </Modal>
        );
    }
}

SettingModal.defaultProps = {
    onOk: () => {},
    onCancel: () => {}
};

SettingModal.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default SettingModal;