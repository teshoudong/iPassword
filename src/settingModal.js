import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './settingModal.scss';
import Modal from './modal';
import storage from './storage';
import encrypt from './encrypt';
import agent from './agent';
import moment from 'moment';
import csv from './csv';
import logo from './logo';
import server from './server';
import QRCode from 'qrcode.react';

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
        const filePaths = [];
        for (let i = 0; i < files.length; i++) {
            filePaths.push(files[i].path);
        }
        this.importFiles(filePaths);
    }

    importFiles(filePaths) {
        const keyPassword = storage.getSessionPassword();
        const promiseList = filePaths.map(filePath => {
            return csv.getCSVData(filePath).then(data => {
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
        });
        
        Promise.all(promiseList).then(list => {
            storage.saveHistory();

            // 更新logo
            const promiseList = [];
            list.forEach(item => {
                const list = storage.savePasswordList(item);
                promiseList.concat(list.map(item => {
                    return new Promise((resolve, reject)=> {
                        logo.getLogo(item).then(logo => {
                            item.img = logo;
                            // 保存logo这块需要优化
                            storage.updatePassword(item);
                        });
                    });
                }));
            });
            Promise.all(promiseList).then(() => this.refreshList());

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

    handleSelect() {
        agent.fileDialog(files => {
            if (files && files.length > 0) {
                this.importFiles(files);
            }
        });
    }

    renderUndo() {
        const { history } = this.state;

        if (history) {
            return (
                <a className="undo" onClick={e => this.handleUndo(e, history)}>撤销</a>
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
                    onClick={() => this.handleSelect()}
                    onDrop={e => this.handleImport(e)} 
                    onDragEnter={() => this.handleImportActive('active')} 
                    onDragLeave={() => this.handleImportActive('normal')}
                    onDragOver={e => e.preventDefault()}>
                    将CVS文件拖拽到此区域
                </div>
                <div className="operation">
                    {this.renderUndo()}
                </div>
            </div>
        );
    }
}

class AppQrcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
        this.createServer();
    }

    componentWillUnmount() {
        this.server.shutdown();
    }

    createServer() {
        this.server = server.createHttpServerForApp(port => {
            this.setState({
                url: `http://${server.getLocalIP()}:${port}`
            });
        });
    }

    render() {
        const { url } = this.state;

        return (
            <div className="settingModal-app">
                {url ? <QRCode value={url}/> : <div className="qrcode"></div>}
            </div>
        );
    }
}

class SettingModal extends React.Component {
    constructor(props) {
        super(props);
        this.list = [
            {
                name: '导入',
                type: 'import',
                render: <ImportPassword/>
            },
            {
                name: 'APP',
                type: 'app',
                render: <AppQrcode/>
            }
        ];
        this.state = {
            type: 'import'
        };
    }

    show() {
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }

    handleType(type) {
        this.setState({
            type
        });
    }

    renderContent() {
        const { type } = this.state;
        const item = this.list.find(item => item.type === type);

        return item && item.render;
    }

    render() {
        const { type } = this.state;

        return (
            <Modal ref={modal => this.modal = modal} title="设置" onOk={() => this.props.onOk()} onCancel={() => this.props.onCancel()}>
                <div className="pw-settingModal">
                    <div className="settingModal-tab">
                        <div className="list">
                            {
                                this.list.map(item => (
                                    <div onClick={() => this.handleType(item.type)} className={classNames({item: true, active: type === item.type})} key={item.type}>{item.name}</div>
                                ))
                            }
                        </div>
                    </div>
                    {this.renderContent()}
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