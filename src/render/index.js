import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import Page from './page';
import './index.scss';

class App extends React.Component {
    render() {
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
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);