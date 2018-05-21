import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './settingModal.scss';
import Modal from './modal';
import storage from './storage';
import encrypt from './encrypt';
import agent from './agent';
import moment from 'moment';

class ImportPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'normal',
            history: storage.getHistory()
        };
    }

    refreshList() {
        window.dispatchEvent(new Event('refreshList'));
    }

    getHistory() {
        this.setState({
            history: storage.getHistory()
        });
    }

    handleImport(e) {
        e.preventDefault();
        this.handleImportActive(false);
        const files = e.dataTransfer.files;
        const keyPassword = storage.getSessionPassword();
        
        const promiseList = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const promise = agent.getCSVData(file).then(data => {
                const list = data.map(item => {
                    const encryptPassword = encrypt.encrypt(item.password, keyPassword);
                    return {
                        account: item.username,
                        name: item.name,
                        encryptPassword,
                        website: item.url
                    };
                });
                return Promise.resolve(list);
            }, err => {
                return Promise.reject(err);
            });
            promiseList.push(promise);
        }
        Promise.all(promiseList).then(list => {
            storage.saveHistory();
            list.forEach(item => {
                storage.savePasswordList(item);
            });
            this.getHistory();
            agent.successDialog('导入成功');
            this.refreshList();
        }, () => {
            agent.errorDialog('导入失败');
        });
    }

    handleImportActive(status) {
        this.setState({status});
    }

    handleUndo(e, history) {
        e.preventDefault();
        agent.confirmDialog({
            content: `是否恢复到上一次导入前（${moment(history.time).format('YYYY-MM-DD HH:ss:mm')}）的结果？`,
            onOk: () => {
                storage.recoverHistory();
                this.getHistory();
                this.refreshList();
            }
        });
    }

    renderOperation() {
        const { history } = this.state;

        if (history) {
            return (
                <div className="operation">
                    <a className="undo" onClick={e => this.handleUndo(e, history)}>撤销</a>
                </div>
            );
        } else {
            return null;
        }
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

                {this.renderOperation()}
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
            <Modal ref={modal => this.modal = modal} title="设置" onOk={() => this.props.onOk()} onCancel={() => this.props.onCancel()}>
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