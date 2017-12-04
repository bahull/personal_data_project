import React, { Component } from "react";

import "./Features.css";

class Features extends Component {
  render() {
    return (
      <div>
        <div id="features" className="features">
          <h2 className="center-align">Features</h2>
          <div className="rows">
            <i className="large material-icons">pie_chart</i>
            <h5>Quick and easy access to high-end charting capabilities</h5>
          </div>
          <div className="rows">
            <h5>
              Ability to customize charts with only information you want to show
              your client
            </h5>
            <i className="large material-icons">local_printshop</i>
          </div>
          <div className="rows">
            <i
              className="fa fa-thermometer-empty fa-5x fontIcons"
              aria-hidden="true"
            />
            <h5>
              High level analysis of clients temperature dependent energy use
            </h5>
          </div>
          <div className="rows">
            <h5>
              Readily access information to determine if an energy project is a
              viable and cost-effective measure to lower operation expenses
            </h5>
            <i className="fa fa-money fa-5x fontIcons" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
