import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Data from "./components/Data/Data";
import Donate from "./components/Donate/Donate";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/data" component={Data} />
    <Route path="/donate" component={Donate} />
  </Switch>
);
