import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './addModal.scss';
import Modal from './modal';
import storage from './storage';

class AddModal extends React.Component {
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
        const website = elements.website.value || '';

        if (account && name && password) {
            storage.savePassword({
                account,
                name,
                password,
                website
            });
            this.hide();
            this.props.onOk();
        }
    }

    show() {
        this.modal.show();
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
        
        return (
            <Modal ref={modal => this.modal = modal} title="添加密码" onOk={() => this.handleSubmit()} onCancel={() => this.props.onCancel()}>
                <div className="pw-addModal">
                    <form className="addModal-form" ref={form => this.form = form} onSubmit={() => this.handleSubmit()}>
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

AddModal.defaultProps = {
    onOk: () => {},
    onCancel: () => {}
};

AddModal.propTypes = {
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

export default AddModal;