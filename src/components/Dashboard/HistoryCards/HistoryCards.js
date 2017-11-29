import React, { Component } from "react";
import axios from "axios";

import CardMaker from "./CardMaker/CardMaker";

import { Modal, Button } from "react-materialize";

import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import "./HistoryCards.css";
import { degreeDaysFinder, sendToNode } from "../../../helpers/uploadHelper";
import {
  updateMonthlyDegreeDays,
  updateProjectLocation,
  updateAddress,
  updateFacility,
  updateSquareFootage,
  updateIndustryType
} from "../../../ducks/reducer";
import { setTimeout } from "timers";

class HistoryCards extends Component {
  constructor() {
    super();
    this.state = {
      history: []
    };
    this.setHistory = this.setHistory.bind(this);
  }

  setHistory(historicalData) {
    degreeDaysFinder(
      historicalData.exceldata,
      this.props.updateMonthlyDegreeDays
    );
    sendToNode(historicalData.exceldata);
    this.props.updateProjectLocation(historicalData.projectlocation);
    this.props.updateAddress(historicalData.street);
    this.props.updateFacility(historicalData.facility);
    this.props.updateSquareFootage(historicalData.sqfoot);
    this.props.updateIndustryType(historicalData.industry);
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        this.setState({ history: response.data });
      })
      .catch(console.log());
  }
  render() {
    let historyDisplay =
      this.state.history.length > 0 &&
      this.state.history.map((curr, index) => {
        return (
          <div className="card" key={index}>
            <h5>{curr.projectlocation}</h5>
            <p>{curr.facility}</p>
            <p>{curr.industry}</p>
            <p>{curr.street}</p>
            <p>{curr.sqfoot}</p>
            <button onClick={() => this.setHistory(curr)}>
              <Link to="/data"> Select </Link>
            </button>
          </div>
        );
      });
    return (
      <div>
        <Modal header="Modal Header" trigger={<Button>MODAL</Button>}>
          <div className="historyContainer">{historyDisplay}</div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    updateMonthlyDegreeDays,
    updateProjectLocation,
    updateAddress,
    updateFacility,
    updateSquareFootage,
    updateIndustryType
  })(HistoryCards)
);
