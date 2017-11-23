import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import csv from "csv";
import { connect } from "react-redux";
import {
  updateUserPermission,
  updateProjectLocation,
  updateAddress,
  updateFacility,
  updateSquareFootage
} from "./../../ducks/reducer";

import { Row, Input, Button, Col, Icon } from "react-materialize";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileName: null
    };

    this.uploader = this.uploader.bind(this);
    // this.sendToNode = this.sendToNode.bind(this);
  }

  componentWillMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) {
        this.props.history.push("/");
      } else if (response.data[0].access === "true") {
        this.props.updateUserPermission(true);
      } else {
        this.props.updateUserPermission(false);
      }
    });
  }

  sendToNode() {
    axios
      .post("/api/retrieveFile", {
        file: this.state.file
      })
      .then(response => {})
      .catch(console.log);
  }

  uploader(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    this.setState({ fileName: file.name });

    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        this.setState({
          file: data
        });
        console.log(this.state.file);
        this.sendToNode();
      });
    };

    // reader.readAsDataURL(file);
    reader.readAsBinaryString(file);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="dashboardContainer">
          {/* <div className="dashboardLeft"> */}
          <h3 className="dashboard-headers">
            Welcome to Raze Energy Sales Solutions Energy User Profile Creator
          </h3>
          <h5 className="dashboard-headers">
            To continue to view your energy user profile, please fill out the
            form below and upload your .csv provided to you by your Raze
            Ambassador
          </h5>
          {/* </div> */}
          {/* <div className="dashboardRight"> */}

          <Row id="dash-row">
            <Input
              className="input-dashboard"
              s={6}
              label="Project Location"
              onChange={e => this.props.updateProjectLocation(e.target.value)}
            />
            <Input
              className="input-dashboard"
              s={6}
              label="Street Address"
              onChange={e => this.props.updateAddress(e.target.value)}
            />
            <Input
              s={12}
              type="select"
              label="Type of Facility"
              defaultValue="1"
              onChange={e => this.props.updateFacility(e.target.value)}
            >
              <option value="1">Commercial</option>
              <option value="2">Industrial</option>
              <option value="3">School</option>
              <option value="4">Church</option>
            </Input>
            <Input
              className="input-dashboard"
              label="Square Footage"
              s={12}
              onChange={e => this.props.updateSquareFootage(e.target.value)}
            />
          </Row>
          {this.props.access === true && (
            <Row>
              <Col s={6}>
                <Button id="file-upload" waves="light" className="blue">
                  <input
                    className="fileInput"
                    type="file"
                    onChange={event => this.uploader(event)}
                  />
                  Upload
                  <Icon left>attach_file</Icon>
                </Button>
                <p>{this.state.fileName}</p>
              </Col>
              <Col s={6}>
                <Link to="/data">
                  <Button
                    className="input-dashboard blue"
                    waves="light"
                    id="final-submit"
                  >
                    Submit
                  </Button>
                </Link>
              </Col>
            </Row>
          )}
          {this.props.access === false && (
            <Row>
              <Col s={12}>
                <Link to="/data">
                  <Button
                    className="input-dashboard blue"
                    waves="light"
                    id="final-submit"
                  >
                    Push to see results
                  </Button>
                </Link>
              </Col>
            </Row>
          )}
          {/* <ul>
              {this.state.file &&
                this.state.file.map((x, i) => {
                  return x.map((cur, i) => {
                    if (i <= 3) {
                      return <li key={i}> {cur} </li>;
                    }
                  });
                })}
            </ul> */}
        </div>
        {/* </div> */}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, {
  updateUserPermission,
  updateProjectLocation,
  updateAddress,
  updateFacility,
  updateSquareFootage
})(Dashboard);
