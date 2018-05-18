import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './settingModal.scss';
import Modal from './modal';
import storage from './storage';
import encrypt from './encrypt';

class ImportPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'normal'
        };
    }

    handleImport(e) {
        e.preventDefault();
        this.handleImportActive(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
        }
    }

    handleImportActive(status) {
        this.setState({status});
    }

    render() {
        const { status } = this.state;

        return (
            <div className="settingModal-import">
                <div className={classNames({import: true, active: status === 'active'})}
                    onDrop={e => this.handleImport(e)} 
                    onDragEnter={() => this.handleImportActive('active')} 
                    onDragLeave={() => this.handleImportActive('normal')}
                    onDragOver={e => e.preventDefault()}>
                    将CVS文件拖拽到此区域
                </div>
            </div>
        );
    }
}

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

    render() {
        return (
            <Modal ref={modal => this.modal = modal} title="设置" onOk={() => this.onOk()} onCancel={() => this.props.onCancel()}>
                <div className="pw-settingModal">
                    <ImportPassword/>
                </div>
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