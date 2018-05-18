import React from 'react';
import PropTypes from 'prop-types';
import './login.scss';
import storage from './storage';
import encrypt from './encrypt';
import agent from './agent';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirst: !storage.getKeyPassword()
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const elements = e.target.elements;
        const password = elements.password.value;
        const { isFirst } = this.state;
        if (password) {
            if (isFirst) {
                const confirm = elements.confirm.value;
                if (confirm === password) {
                    storage.saveKeyPassword(encrypt.encryptMd5(password));
                    this.props.onLogin(password);
                } else {
                    agent.errorDialog('两次密码不一致');
                }
            } else {
                if (encrypt.encryptMd5(password) === storage.getKeyPassword()) {
                    this.props.onLogin(password);
                } else {
                    agent.errorDialog('密码不正确');
                }
            }
        } else {
            agent.errorDialog('请输入密码');
        }
    }

    render() {
        const { isFirst } = this.state;

        return (
            <div className="pw-login">
                <div className="login-container">
                    <h1 className="login-title">iPassword</h1>
                    <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
                        <div className="login-input">
                            <input type="password" name="password" placeholder={isFirst ? '首次登陆请输入密码' : '请输入密码'}/>
                            {isFirst && <input type="password" name="confirm" placeholder="确认密码"/>}
                        </div>
                        <button type="submit" className="login-button">登录</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.defaultProps = {
    onLogin: () => {}
};

Login.propTypes = {
    onLogin: PropTypes.func
};

export default Login;