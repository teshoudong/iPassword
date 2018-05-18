import React from 'react';
import './all.scss';
import PasswordModal from './passwordModal';
import storage from './storage';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import agent from './agent';
import encrypt from './encrypt';
import fuzzy from 'fuzzy';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordMap: {}
        };
    }

    componentDidMount() {
        this.getPasswordMap();
    }

    getPasswordMap(passwordList) {
        passwordList = passwordList || storage.getPasswordList();
        let map = {};
        passwordList.forEach(item => {
            const prefix = item.name.substr(0, 1).toUpperCase();
            map[prefix] = map[prefix] || [];
            map[prefix].push(item);
        });

        this.setState({
            passwordMap: map
        });
    }

    handleAdd() {
        this.addModal.show();
    }

    handleSelect(item) {
        this.props.onSelect(item);
    }

    handleSearch(e) {
        const content = e.target.value;
        const passwordList = storage.getPasswordList();
        const result = fuzzy.filter(content, passwordList, {
            extract: el => `${el.account} ${el.name} ${el.website}`
        }).map(item => item.original);
        this.getPasswordMap(result);
    }

    handleMenu(item, key) {
        agent.showMenu([
            {
                label: '编辑',
                click: () => {
                    this.editModal.show(item);
                }
            },
            {
                label: '删除',
                click: () => {
                    agent.confirmDialog({
                        content: `是否删除${item.name}?`,
                        onOk: () => {
                            const list = storage.delPassword(item);
                            this.getPasswordMap(list);
                        }
                    });
                }
            }
        ]);
    }

    renderList() {
        const map = this.state.passwordMap;
        return Object.keys(map).map(key => (
            <div className="list-group" key={key}>
                <h1 className="list-title">{key}</h1>
                {
                    map[key].map(item => (
                        <div className="list-item" key={item.id} onContextMenu={() => this.handleMenu(item, key)} onClick={() => this.handleSelect(item)}>
                            <div className="img">
                                {item.img && <img src={item.img}/>}
                            </div>
                            <div className="content">
                                <p className="title">{item.name}</p>
                                <p className="subtitle">{item.account}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        ));
    }

    render() {
        return (
            <div className="pw-list">
                <div className="list-header">
                    <div className="search">
                        <input type="text" placeholder="搜索所有项目" onInput={e => this.handleSearch(e)}/>
                    </div>
                    <div className="add" onClick={() => this.handleAdd()}></div>
                </div>
                <div className="list-content">
                    {this.renderList()}
                </div>
                <PasswordModal ref={modal => this.addModal = modal} title="添加密码" onOk={() => this.getPasswordMap()}/>
                <PasswordModal ref={modal => this.editModal = modal} title="编辑密码" onOk={() => this.getPasswordMap()}/>
            </div>
        );
    }
}

List.defaultProps = {
    onSelect: () => {}
};

List.propTypes = {
    onSelect: PropTypes.func
};

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    handleUrl(e, url) {
        e.preventDefault();
        agent.openUrl(url);
    }

    handlePassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render() {
        const { info, onClose } = this.props;
        const { showPassword } = this.state;
        if (info) {
            return (
                <div className="pw-detail">
                    <div className="detail-close" onClick={() => onClose()}></div>
                    <div className="detail-img">
                        {info.img && <img src={info.img}/>}
                    </div>
                    <h1 className="detail-title">{info.name}</h1>
                    <div className="detail-list">
                        <div className="item">
                            <p className="title">账号</p>
                            <p className="content">{info.account}</p>
                        </div>
                        <div className="item">
                            <p className="title">密码</p>
                            <div className="content">
                                <input type={showPassword ? 'text' : 'password'} readOnly={true} value={info.password}/>
                                <div className={classNames({showPassword: true, active: showPassword})} onClick={() => this.handlePassword()}></div>
                            </div>
                        </div>
                        {info.website && (
                            <div className="item">
                                <p className="title">网站</p>
                                <p className="content"><a onClick={e => this.handleUrl(e, info.website)}>{info.website}</a></p>
                            </div>
                        )}
                        <div className="item">
                            <p className="title">创建时间</p>
                            <p className="content">{moment(info.createTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                        </div>
                        <div className="item">
                            <p className="title">修改时间</p>
                            <p className="content">{moment(info.updateTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

Detail.defaultProps = {
    onClose: () => {}
};

Detail.propTypes = {
    info: PropTypes.object,
    onClose: PropTypes.func
};

class All extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPassword: null
        };
    }

    handleSelectPassword(password) {
        const keyPassword = storage.getSessionPassword();
        password.password = encrypt.decipher(password.encryptPassword, keyPassword);
        this.setState({
            selectedPassword: password
        });
    }

    handleCloseDetail() {
        this.setState({
            selectedPassword: null
        });
    }

    render() {
        const { selectedPassword } = this.state;

        return (
            <div className="pw-all">
                <List onSelect={password => this.handleSelectPassword(password)}/>
                <Detail info={selectedPassword} onClose={() => this.handleCloseDetail()}/>
            </div>
        );
    }
}

export default All;