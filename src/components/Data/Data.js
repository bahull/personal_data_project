import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";
import { connect } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";

import DataTable from "./DataTable/DataTable";

import { updateAnnualCost } from "./../../ducks/reducer";

import {
  changedArray,
  commercialPercentage,
  industryPetroleumPercentage,
  industryChemicalPercentage,
  industryPaperPercentage,
  industryMetalsPercentage,
  industryFoodPercentage,
  totalAnnualCost
} from "./../../helpers/helpers";

import "./Data.css";

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Energy Use",
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(133, 102, 266, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(133, 102, 266, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)"
            ],
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 83, 37, 65, 55, 80]
          }
        ]
      }
    };
  }

  componentWillMount() {
    axios.get("/api/me").then(response => {
      if (!response.data) {
        this.props.history.push("/");
      } else {
        axios.get("/api/get").then(response => {
          if (!response.data.newFile) {
          } else if (this.props.facility === "Commercial") {
            let newArray = [];
            let newData = response.data.newFile;
            let totalCost = [];
            let totalAnnualBreakdown = [];
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            commercialPercentage(newArray, typeHolder);
            totalAnnualCost(newData, totalCost, this.props.updateAnnualCost);
            console.log(totalCost);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Other uses",
              "Appliances and Electronics",
              "HVAC",
              "Lighting",
              "Water Heating"
            ];

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Petroleum"
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            industryPetroleumPercentage(newArray, typeHolder);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Process Heating",
              "Drivepower",
              "CHP/ Cogeneration Proceess",
              "Boiler use",
              "Other",
              "Facility HVAC"
            ];

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Chemical"
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            industryChemicalPercentage(newArray, typeHolder);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Process Heating",
              "Drivepower",
              "CHP/ Cogeneration Proceess",
              "Boiler use",
              "Other",
              "Facility HVAC"
            ];

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Paper"
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            industryPaperPercentage(newArray, typeHolder);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Process Heating",
              "Drivepower",
              "CHP/ Cogeneration Proceess",
              "Boiler use",
              "Other",
              "Facility HVAC"
            ];

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Food"
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            industryFoodPercentage(newArray, typeHolder);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Process Heating",
              "Drivepower",
              "CHP/ Cogeneration Proceess",
              "Boiler use",
              "Other",
              "Facility HVAC",
              "Cooling and Refrigeration"
            ];

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Primary Metals"
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            changedArray(newData, newArray, this.state);
            industryMetalsPercentage(newArray, typeHolder);

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = [
              "Process Heating",
              "Drivepower",
              "CHP/ Cogeneration Proceess",
              "Boiler use",
              "Other",
              "Facility HVAC",
              "Electro-chemical Processes"
            ];

            this.setState(newState);
          }
        });
      }
    });
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom"
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <div id="data-headers">
            <div id="splitCharts">
              <h4> {this.props.projectLocation} </h4>
              <h4> {this.props.address} </h4>

              <DataTable />
              <Pie
                data={this.state.chartData}
                options={{
                  title: {
                    display: this.props.displayTitle,
                    text: "Energy Usage",
                    fontSize: 25
                  },
                  legend: {
                    display: this.props.displayLegend,
                    position: this.props.legendPosition
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { updateAnnualCost })(Data);
