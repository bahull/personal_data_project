import React, { Component } from "react";
import Header from "./../Header/Header";

import "./LandingPage.css";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="landing-body">
          <h2 className="app-intro">
            Provider of energy solutions software to the leading U.S. Energy
            Solutions experts
          </h2>
        </div>
      </div>
    );
  }
}

export default LandingPage;
