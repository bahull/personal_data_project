import React, { Component } from "react";
import axios from "axios";

import { Modal, Button } from "react-materialize";

import "./HistoryCards.css";

class HistoryCards extends Component {
  constructor() {
    super();
    this.state = {
      history: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        console.log(response, response.data);
        this.setState({ history: response.data });
      })
      .catch(console.log());
  }
  render() {
    return (
      <div id="modal-backdrop">
        <Modal header="Modal Header" trigger={<Button>MODAL</Button>}>
          {this.state.history &&
            this.state.history.map(curr => {
              <div>
                <p>curr.facility</p>
                <p>curr.projectlocation</p>
                <p>curr.exceldata</p>
              </div>;
            })}
        </Modal>
      </div>
    );
  }
}

export default HistoryCards;
