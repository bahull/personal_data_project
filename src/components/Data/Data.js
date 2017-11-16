import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";

class Data extends Component {
  componentWillMount() {
    console.log("Front hit", this.props);
    axios.get("/api/me").then(response => {
      console.log(response);
      if (!response.data) this.props.history.push("/");
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
