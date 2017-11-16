import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import csv from "csv";

import Header from "./../Header/Header";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.uploader = this.uploader.bind(this);
    // this.sendToNode = this.sendToNode.bind(this);
  }
  // componentWillMount() {
  //   axios.get("/api/me").then(response => {
  //     if (!response.data) this.props.history.push("/");
  //   });
  // }

  sendToNode() {
    axios
      .post("/api/retrieveFile", {
        file: this.state.file
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(console.log);
  }

  uploader(event) {
    event.preventDefault();
    console.log("original upload:", event);

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        console.log("parsed data:", data);
        this.setState({
          file: data
        });
        this.sendToNode();
      });
    };

    // reader.readAsDataURL(file);
    reader.readAsBinaryString(file);
  }

  render() {
    console.log(this.state.file);
    return (
      <div>
        <Header />
        <div className="dashboardContainer">
          <div className="dashboardLeft">
            <Link to="/data">
              <button> Hello </button>
            </Link>
          </div>
          <div className="dashboardRight">
            <input
              className="fileInput"
              type="file"
              onChange={event => this.uploader(event)}
            />
            <ul>
              {this.state.file &&
                this.state.file.map((x, i) => {
                  return x.map((cur, i) => {
                    if (i <= 3) {
                      return <li key={i}> {cur} </li>;
                    }
                  });
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
