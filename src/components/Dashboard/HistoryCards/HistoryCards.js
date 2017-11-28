import React, { Component } from "react";
import axios from "axios";

import "./HistoryCards.css";

class HistoryCards extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      projectLocation: "",
      address: "",
      facility: "",
      industry: "",
      sqfoot: ""
    };
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        console.log(response, response.data);
      })
      .catch(console.log());
  }
  render() {
    return <div>test</div>;
  }
}

export default HistoryCards;
