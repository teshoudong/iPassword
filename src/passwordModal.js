import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './passwordModal.scss';
import Modal from './modal';
import storage from './storage';
import encrypt from './encrypt';
import agent from './agent';
import logo from './logo';

class PasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    handleSubmit() {
        const elements = this.form.elements;
        const account = elements.account.value;
        const name = elements.name.value;
        const password = elements.password.value;
        let website = elements.website.value || '';

        if (website && !website.startsWith('http')) {
            if (website.startsWith('//')) {
                website = `http:${website}`;
            } else {
                website = `http://${website}`;
            }
        }

        if (account && name && password) {
            const keyPassword = storage.getSessionPassword();
            const encryptPassword = encrypt.encrypt(password, keyPassword);
            let passwordObj = null;
            if (this.item) {
                passwordObj = storage.updatePassword({
                    id: this.item.id,
                    img: this.item.img || '',
                    account,
                    name,
                    encryptPassword,
                    website
                });
            } else {
                passwordObj = storage.savePassword({
                    account,
                    name,
                    encryptPassword,
                    website
                });
            }
            this.hide();
            this.props.onOk();

            logo.getLogo(passwordObj).then(logo => {
                if (logo) {
                    passwordObj.img = logo;
                    storage.updatePassword(passwordObj);
                    this.props.onOk();
                }
            });
        } else {
            agent.errorDialog('漏填了');
        }
    }

    show(item) {
        this.modal.show();
        if (item) {
            const keyPassword = storage.getSessionPassword();
            item.password = encrypt.decipher(item.encryptPassword, keyPassword);
            this.item = item;
            Object.keys(item).forEach(key => {
                const formItem = this.form.elements[key];
                if (formItem) {
                    formItem.value = item[key];
                }
            });
        }
    }

    hide() {
        this.modal.hide();
    }

    handlePassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render() {

        const { showPassword } = this.state;
        const { title } = this.props;
        
        return (
            <Modal ref={modal => this.modal = modal} title={title} onOk={() => this.handleSubmit()} onCancel={() => this.props.onCancel()}>
                <div className="pw-passwordModal">
                    <form className="passwordModal-form" ref={form => this.form = form} onSubmit={() => this.handleSubmit()}>
                        <div className="item">
                            <p className="title required">名称</p>
                            <div className="content">
                                <input name="name" type="name" placeholder="请输入名称"/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="title required">账号</p>
                            <div className="content">
                                <input name="account" type="text" placeholder="请输入账号"/>
                            </div>
                        </div>
                        <div className="item">
                            <p className="title required">密码</p>
                            <div className="content">
                                <input className="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="请输入密码"/>
                                <div className={classNames({showPassword: true, active: showPassword})} onClick={() => this.handlePassword()}></div>
                            </div>
                        </div>
                        <div className="item">
                            <p className="title">网站</p>
                            <div className="content">
                                <input name="website" type="text" placeholder="例如:http://ipassword.com"/>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

PasswordModal.defaultProps = {
    onOk: () => {},
    onCancel: () => {}
};

PasswordModal.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default PasswordModal;