import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";

class Data extends Component {
  componentWillMount() {
    axios.get("http://localhost:3001/api/me").then(response => {
      console.log(response);
    });
  }
  render() {
    return (
      <div>
        <Header />Data
      </div>
    );
  }
}

export default Data;
