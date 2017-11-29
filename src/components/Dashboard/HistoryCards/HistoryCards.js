import React, { Component } from "react";
import axios from "axios";

import CardMaker from "./CardMaker/CardMaker";

import { Modal, Button } from "react-materialize";

import "./HistoryCards.css";

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
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        console.log(response.data);
        this.setState({ history: response.data });
      })
      .catch(console.log());
  }
  render() {
    let historyDisplay =
      this.state.history.length > 0 &&
      this.state.history.map((curr, index) => {
        console.log(curr);

        return (
          <div className="card" key={index}>
            <h5>{curr.projectlocation}</h5>
            <p>{curr.facility}</p>
            <p>{curr.industry}</p>
            <p>{curr.street}</p>
            <p>{curr.sqfoot}</p>
            <button onClick={() => this.setHistory(curr)}> Select </button>
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

export default HistoryCards;
