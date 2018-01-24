import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import All from './all';

class Page extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={All}></Route>
                </Switch>
            </HashRouter>
        );
    }
}

export default Page;