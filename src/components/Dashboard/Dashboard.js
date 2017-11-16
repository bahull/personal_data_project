import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "./../Header/Header";

import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <h2 id="dash-heading"> Dashboard</h2>
        <Link to="/data">
          <button>Hello</button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
