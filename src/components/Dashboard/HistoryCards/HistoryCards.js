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
  updateIndustryType,
  updateFileId
} from "../../../ducks/reducer";

class HistoryCards extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
      numberChange: 0,
      modal: false
    };
    this.setHistory = this.setHistory.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  setHistory(historicalData) {
    console.log("Historical data for cards here", historicalData);
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
    this.props.updateFileId(historicalData.id);
    this.setState({ numberChanger: Math.random() });
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        this.setState({ history: response.data });
      })
      .catch(console.log());
    // if (this.props.location.state.showModal) {
    //   this.setState({ modal: true });
    // } else {
    //   (" ");
    // }

    // console.log("this.props.location;: ", this.props.location);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    let historyDisplay =
      this.state.history.length > 0 &&
      this.state.history.map((curr, index) => {
        // if (this.props.location === "/data") {
        return (
          <div className="card" key={index}>
            <div onClick={() => this.setHistory(curr)}>
              <Link to="/data">
                {/* <Card
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
                > */}

                <h4>{curr.projectlocation}</h4>

                {curr.facility && curr.industry ? (
                  <div className="histCardP">
                    <h5>{curr.facility}</h5>

                    <p>{curr.industry}</p>
                  </div>
                ) : (
                  <h5>{curr.facility}</h5>
                )}
                <div className="left-align">
                  <p>{curr.street}</p>
                  <p>{curr.sqfoot} sq ft</p>
                </div>
                {/* </Card> */}
                <div className="bottom-card">
                  <hr className="hrCard" />
                  <Button className="bottom-card-button yellow center-align">
                    Select
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        );
        // } else {
        // return (
        //   <div className="card open" key={index}>
        //     <button
        //       className="modal-close"
        //       onClick={() => this.setHistory(curr)}
        //     >
        //       <Link to="/data">
        //         <Card
        //           className="blue-grey darken-1"
        //           textClassName="white-text"
        //           title={curr.projectlocation}
        //           // actions={
        //           //   <Button className="center-align yellow center-words">
        //           //     <Link to="/data">Select</Link>
        //           //   </Button>
        //           // }
        //         >
        //           <p>{curr.facility}</p>
        //           <p>{curr.industry}</p>
        //           <p>{curr.street}</p>
        //           <p>{curr.sqfoot}</p>
        //         </Card>
        //       </Link>
        //     </button>
        //   </div>
        // );
        // }
      });
    return (
      <div>
        {this.props.access ? (
          <Button className="modalButton" onClick={this.toggleModal}>
            Saved Profiles
          </Button>
        ) : (
          ""
        )}
        {this.state.modal && (
          <div className="modalBackground" onClick={console.log("Hello")}>
            <div className="dashboardModal">
              <div className="historyContainer">{historyDisplay}</div>
              <div onClick={this.toggleModal}>
                <svg
                  className="exitButton"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1000 1000"
                >
                  <g>
                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                      <path d="M4537.7,4997.3c-941-96.6-1775.1-427.3-2547.6-1010.8c-211.6-160.3-706.7-655.4-867-867c-316.4-421.2-604-947.1-754-1378.6c-92.5-273.3-187-659.5-232.2-953.3c-49.3-328.7-49.3-1029.3,0-1356c133.5-869.1,454.1-1625.1,986.2-2331.9c150-197.2,624.6-678,828-836.2c675.9-532.1,1497.7-883.4,2370.9-1017c328.7-49.3,1031.4-49.3,1356,0c877.3,135.6,1697,486.9,2370.9,1017c187,145.9,651.3,610.2,797.1,797.1c530.1,673.9,881.4,1493.6,1017,2370.9c49.3,324.6,49.3,1027.3,0,1356c-133.5,873.2-484.9,1695-1017,2370.9c-158.2,203.4-639,678-836.2,828c-700.6,528-1469,854.7-2311.3,982.1C5435.6,5007.6,4790.4,5024,4537.7,4997.3z M5427.3,4237.1C6508,4120,7479.8,3602.3,8176.3,2774.3c815.6-971.8,1140.3-2243.5,889.6-3496.8c-94.5-474.6-322.6-1025.2-587.6-1427.9C7525-3592.6,5852.6-4293.2,4167.9-3956.3c-811.5,162.3-1602.5,604-2186,1222.4c-573.2,606.1-936.9,1341.6-1084.8,2196.3c-49.3,287.6-49.3,1006.7,0,1294.3c213.7,1232.7,922.5,2280.5,1966.2,2911.2c460.2,277.4,1054,486.9,1551.2,548.5c102.7,12.3,207.5,26.7,236.3,30.8C4767.8,4263.8,5240.4,4257.7,5427.3,4237.1z" />
                      <path d="M2842.8,2679.8c-141.7-43.1-289.7-170.5-359.5-310.2c-53.4-106.8-63.7-302-20.5-433.5c32.9-104.8,90.4-166.4,891.7-969.7L4209,109.6l-846.5-848.5c-464.3-464.3-860.8-879.3-881.4-918.4c-53.4-100.7-53.4-392.4,0-493.1c51.4-100.7,172.6-221.9,269.1-273.2c111-59.6,394.5-63.7,503.4-6.2c39,20.5,447.9,413,910.1,871.1L5000-722.5l838.2-836.2c460.2-458.1,869-850.6,908.1-871.1c108.9-57.5,392.4-53.4,503.4,6.2c96.6,51.4,217.8,172.6,269.1,273.2c53.4,100.7,53.4,392.4,0,493.1c-20.5,39-417.1,454-881.4,920.4L5791,109.6l846.5,848.5c464.3,464.3,860.8,879.3,881.4,918.4c57.5,108.9,53.4,392.4-6.2,503.3c-51.4,96.6-172.6,217.8-273.2,269.2c-100.7,53.4-392.4,53.4-493.1,0c-39-20.5-447.9-413-908.1-871.1L5000,941.7l-838.2,838.2c-741.7,741.7-848.5,840.3-945.1,877.3C3107.8,2698.3,2939.3,2708.6,2842.8,2679.8z" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
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
    updateIndustryType,
    updateFileId
  })(HistoryCards)
);
