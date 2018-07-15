import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react';

import AppHeader from './AppHeader.jsx';
import ListStuff from './ListStuff.jsx';
import Home from './Home.jsx';
import NewStuff from './NewStuff.jsx';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppHeader />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/stuff/list" component={ListStuff} />
            <Route path="/stuff/new/:barcode?" component={NewStuff} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
