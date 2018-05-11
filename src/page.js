import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import All from './all';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

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