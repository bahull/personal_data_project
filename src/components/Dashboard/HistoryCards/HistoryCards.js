import React, { Component } from "react";
import axios from "axios";

import { Modal, Button, Card } from "react-materialize";

import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import "./HistoryCards.css";
import {
  degreeDaysFinderUpload,
  sendToNodeUpload
} from "../../../helpers/uploadHelper";
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
    console.log(historicalData);
    degreeDaysFinderUpload(
      historicalData.exceldata,
      this.props.updateMonthlyDegreeDays
    );
    sendToNodeUpload(historicalData.exceldata);
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
            <button
              className="modal-close"
              onClick={() => this.setHistory(curr)}
            >
              <Link to="/data">
                <Card
                  className="blue-grey darken-1"
                  textClassName="white-text"
                  title={curr.projectlocation}
                  actions={
                    <Link to="/data">
                      <Button className="center-align yellow center-words">
                        Select
                      </Button>
                    </Link>
                  }
                >
                  <p>{curr.facility}</p>
                  <p>{curr.industry}</p>
                  <p>{curr.street}</p>
                  <p>{curr.sqfoot}</p>
                </Card>
              </Link>
            </button>
          </div>
        );
      });
    return (
      <div>
        <Modal header="" trigger={<Button>Past User Reports</Button>}>
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
