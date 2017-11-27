import React, { Component } from "react";
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Data from "./components/Data/Data";
import Donate from "./components/Donate/Donate";


import "./App.css";


class App extends Component {
  render() {
    return <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/data" component={Data} />
        <Route path="/donate" component={Donate} />
      </Switch>
    </div>;
  }
}
const mapStateToProps = state => {
  return state
}
export default withRouter(connect(mapStateToProps)(App));
