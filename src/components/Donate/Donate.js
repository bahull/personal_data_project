import React, { Component } from "react";
import Header from "./../Header/Header";
import Checkout from "./../Checkout/Checkout";
import "./Donate.css";

class Donate extends Component {
  render() {
    return (
      <div>
        <Header />
        Hello
        <Checkout amount={1000} description={"Testing"} />
      </div>
    );
  }
}

export default Donate;
