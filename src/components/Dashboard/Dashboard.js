import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Papa from "papaparse";

import HistoryCards from "./HistoryCards/HistoryCards";

import {
  updateUserPermission,
  updateProjectLocation,
  updateAddress,
  updateFacility,
  updateSquareFootage,
  updateIndustryType,
  updateMonthlyDegreeDays
} from "./../../ducks/reducer";

import { Row, Input, Button, Col, Icon } from "react-materialize";

import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";

import "./Dashboard.css";

const config = {
  delimiter: "", // auto-detect
  newline: "", // auto-detect
  quoteChar: '"',
  header: false,
  dynamicTyping: false,
  preview: 0,
  encoding: "",
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  skipEmptyLines: false,
  chunk: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  stateSetter: file => {
    this.setState({});
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      fileName: null,
      degreeDays: []
    };

    this.uploader = this.uploader.bind(this);
    this.sendToNode = this.sendToNode.bind(this);
    this.degreeDaysFinder = this.degreeDaysFinder.bind(this);
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
    console.log(this.state.file);
    axios
      .post("/api/retrieveFile", {
        file: this.state.file,
        projectLocation: this.props.projectLocation,
        address: this.props.address,
        facility: this.props.facility,
        industry: this.props.industry,
        squareFootage: this.props.squareFootage
      })
      .then(response => {
        response;
      })
      .catch(console.log);
  }

  degreeDaysFinder() {
    let copyOfFile = this.state.file;
    let trashHolder = copyOfFile.splice(0, 1);
    let startMonth = [];
    startMonth = copyOfFile[0][0].split(/[/-]/g);

    let month = parseInt(startMonth[0]);
    let year = parseInt(startMonth[2].substr(2, 2));
    let total = copyOfFile.length;

    this.props.updateMonthlyDegreeDays(month, 15, total);
  }

  stateSetting(obj) {
    this.setState({ file: obj });
  }

  uploader(event) {
    event.preventDefault();

    let reader = new FileReader();
    let fileUpload = event.target.files[0];

    this.setState({ fileName: fileUpload.name });

    Papa.parse(fileUpload, {
      complete: results => {
        console.log("Finished:", results.data);
        let newFile = results.data.slice(0, results.data.length - 1);
        console.log("newFile: ", newFile);
        this.setState({ file: newFile });
      }
    });

    // reader.onload = () => {
    //   console.log(reader.result);
    //   Papa.parse(reader.result, config, this.stateSetting());
    //     this.degreeDaysFinder();
    //     // this.sendToNode();
    //   });
    // };
    console.log("Not Render:              ___________", this.state.file);
    // reader.readAsDataURL(file);
    reader.readAsBinaryString(fileUpload);
  }

  render() {
    console.log("file in render:              ___________", this.state.file);
    return (
      <div>
        <Header />
        <div className="dashboardContainer">
          <h3 className="dashboard-headers">
            Welcome to Raze Energy Sales Solutions Energy User Profile Creator
          </h3>
          <h5 className="dashboard-headers">
            To continue to view your energy user profile, please fill out the
            form below and upload your .csv provided to you by your Raze
            Ambassador
          </h5>

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
              defaultValue="Commercial"
              onChange={e => this.props.updateFacility(e.target.value)}
            >
              <option value="Commercial">Select One</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
            </Input>
            {this.props.facility === "Industrial" && (
              <Input
                s={12}
                type="select"
                label="Type of Industrial Facility"
                defaultValue="1"
                onChange={e => this.props.updateIndustryType(e.target.value)}
              >
                <option value="Petroleum">Select One</option>
                <option value="Petroleum">Petroleum</option>
                <option value="Chemical">Chemical</option>
                <option value="Paper">Paper</option>
                <option value="Primary Metals">Primary Metals</option>
                <option value="Food">Food</option>
              </Input>
            )}
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
                    onClick={this.sendToNode}
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
          <div id="notmine">
            <HistoryCards />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default withRouter(
  connect(mapStateToProps, {
    updateUserPermission,
    updateProjectLocation,
    updateAddress,
    updateFacility,
    updateSquareFootage,
    updateIndustryType,
    updateMonthlyDegreeDays
  })(Dashboard)
);
