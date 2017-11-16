import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import csv from "csv";

import Header from "./../Header/Header";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  componentWillMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) this.props.history.push("/");
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Link to="/data">
          <button>Hello</button>
        </Link>
        <hr />
      </div>
    );
  }
}

export default Dashboard;
