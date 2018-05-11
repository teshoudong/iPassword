import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import Page from './page';
import Login from './login';
import storage from './storage';
import './index.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        };
    }

    handleLogin(password) {
        storage.saveSessionPassword(password);
        this.setState({
            isLogin: true
        });
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div className="container">
                    <div className="container-menu">
                        <Menu/>
                    </div>
                    <div className="container-page">
                        <Page/>
                    </div>
                </div>
            );
        } else {
            return <Login onLogin={password => this.handleLogin(password)}/>;
        }
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);