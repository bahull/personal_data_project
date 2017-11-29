import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./CardMaker.css";

class CardMaker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      excel,
      projectlocation,
      facility,
      industry,
      street,
      sqfoot
    } = this.props;
    return (
      <div className="card">
        <h4>{projectlocation}</h4>
        <p>{facility}</p>
        <p>{industry}</p>
        <p>{street}</p>
        <p>{sqfoot}</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default withRouter(connect(mapStateToProps)(CardMaker));
