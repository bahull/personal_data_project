import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
// import Data from "./components/Data/Data";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    {/* <Route path="/about" component={About} /> */}
    {/* <Route path="/contact" component={Contact} /> */}
    {/* <Route path="/features" component={Features} /> */}
    <Route path="/dashboard" component={Dashboard} />
    {/* <Route path="/data" component={Data} /> */}
  </Switch>
);
