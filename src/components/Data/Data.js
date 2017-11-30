import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";

import {
  Row,
  Col,
  Button,
  SideNav,
  SideNavItem,
  Collapsible,
  CollapsibleItem,
  Input
} from "react-materialize";

import DataTable from "./DataTable/DataTable";
import EnergyTable from "./EnergyTable/EnergyTable";
import Footer from "./../Footer/Footer";

import {
  updateAnnualCost,
  updateAnnualBreakdown,
  updateAnnualMonths,
  updateMonthlyCost,
  updateMonthlyDegreeDays,
  updateMonthlyKW,
  updateAnnualKW,
  updateProjectLocation,
  updateSquareFootage
} from "./../../ducks/reducer";

import {
  changedArray,
  commercialPercentage,
  industryPetroleumPercentage,
  industryChemicalPercentage,
  industryPaperPercentage,
  industryMetalsPercentage,
  industryFoodPercentage,
  totalAnnualCostCommercial,
  totalAnnualCostPetroleum,
  totalAnnualCostChemical,
  totalAnnualCostPaper,
  totalAnnualCostFood,
  totalAnnualCostMetals
} from "./../../helpers/helpers";

import {
  addMonths,
  monthlyCost,
  degreeDaysUpdater,
  getMonthlyKw,
  getAnnualKw
} from "./../../helpers/comboChartHelpers";

import "./Data.css";

class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: this.props.months,
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
      },
      chartData2: {
        labels: this.props.monthsFromBill,
        datasets: [
          {
            label: "Monthly Cost",
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
            data: [65, 59, 80, 81, 56, 55, 40, 83, 37, 65, 55, 80],
            yAxisID: "left-y-axis"
          },
          {
            data: [20, 50, 100, 75, 25, 0, 150, 49, 200, 299, 149, 100],
            label: "Total Degree Days",
            type: "line",
            backgroundColor: ["rgba(100, 152, 200, 1)"],
            // borderColor: ["rgba(0, 0, 0, 1)"],

            // This binds the dataset to the left y axis
            yAxisID: "right-y-axis"
          }
        ]
      },
      active: true,
      annualCostTable: true,
      annualEnergyChart: true,
      annualDegreeDayChart: true,
      overallSqFtCost: true,
      history: []
    };
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/getFile")
      .then(response => {
        this.setState({ history: response.data });
      })
      .catch(console.log());

    axios.get("/api/me").then(response => {
      if (!response.data) {
        this.props.history.push("/");
      } else {
        axios.get("/api/get").then(response => {
          if (!response.data.newFile) {
            console.log("Nope You found the other one");

            this.props.updateProjectLocation("Fictional Academy");

            this.props.updateSquareFootage(10000);

            this.props.updateAnnualCost(100000);

            this.props.updateAnnualBreakdown([
              36000,
              16000,
              26000,
              20000,
              2000
            ]);

            this.props.updateMonthlyCost([
              8000,
              6000,
              5000,
              10000,
              8000,
              12000,
              15000,
              9000,
              7000,
              8000,
              3000,
              9000
            ]);

            this.props.updateMonthlyDegreeDays(1, 15, 12);

            this.props.updateMonthlyKW([
              6000,
              8000,
              10000,
              12000,
              5000,
              6000,
              10000,
              9000,
              8000,
              9000,
              3000,
              4000
            ]);

            this.props.updateAnnualKW(90000);

            let newState = Object.assign({}, this.state);
            newState = {
              chartData: {
                labels: this.props.commercialHeaders,
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
                    data: [8000, 24223, 12000, 8400, 16000]
                  }
                ]
              },
              chartData2: {
                labels: this.props.months,
                datasets: [
                  {
                    label: "Monthly Cost",
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
                    data: this.props.monthlyCost,
                    yAxisID: "left-y-axis"
                  },
                  {
                    data: [
                      840,
                      905,
                      443,
                      297,
                      282,
                      163,
                      187,
                      393,
                      499,
                      378,
                      387,
                      238
                    ],
                    label: "Total Degree Days",
                    type: "line",
                    backgroundColor: ["rgba(100, 152, 200, 1)"],
                    // borderColor: ["rgba(0, 0, 0, 1)"],

                    // This binds the dataset to the left y axis
                    yAxisID: "right-y-axis"
                  }
                ]
              }
            };

            this.setState(newState);
          } else if (
            this.props.facility === "Commercial" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let totalCost = [];
            let typeHolder = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            commercialPercentage(newArray, typeHolder);
            totalAnnualCostCommercial(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);

            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.commercialHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;
            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Petroleum" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            let totalCost = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            industryPetroleumPercentage(newArray, typeHolder);
            totalAnnualCostPetroleum(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);
            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.petroleumHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Chemical" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            let totalCost = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            industryChemicalPercentage(newArray, typeHolder);
            totalAnnualCostChemical(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);
            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.chemicalHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Paper" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            let totalCost = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            industryPaperPercentage(newArray, typeHolder);
            totalAnnualCostPaper(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);
            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.paperHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Food" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            let totalCost = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            industryFoodPercentage(newArray, typeHolder);
            totalAnnualCostFood(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);
            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.foodHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;

            this.setState(newState);
          } else if (
            this.props.facility === "Industrial" &&
            this.props.industry === "Primary Metals" &&
            this.props.access === true
          ) {
            let newArray = [];
            let newData = response.data.newFile;
            let typeHolder = [];
            let totalCost = [];
            let degreeDays = [];
            changedArray(newData, newArray, this.state);
            industryMetalsPercentage(newArray, typeHolder);
            totalAnnualCostMetals(
              newData,
              totalCost,
              this.props.updateAnnualCost,
              this.props.updateAnnualBreakdown
            );
            addMonths(
              this.props.months,
              newData,
              this.props.updateAnnualMonths
            );
            monthlyCost(newData, this.props.updateMonthlyCost);
            degreeDaysUpdater(this.props.monthlyDegreeDays, degreeDays);

            getMonthlyKw(newData, this.props.updateMonthlyKW);
            getAnnualKw(
              newData,
              this.props.updateAnnualKW,
              this.props.monthlyKW
            );

            let newState = Object.assign({}, this.state);
            newState.chartData.datasets[0].data = typeHolder;
            newState.chartData.labels = this.props.metalsHeaders;
            newState.chartData2.labels = this.props.monthsFromBill;
            newState.chartData2.datasets[0].data = this.props.monthlyCost;
            newState.chartData2.datasets[1].data = degreeDays;

            this.setState(newState);
          } else if (this.props.access === false) {
            console.log("You Found Me");
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

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }
  toggleClassCostTable() {
    const currentState = this.state.annualCostTable;
    this.setState({ annualCostTable: !currentState });
  }
  toggleClassEnergyChart() {
    const currentState = this.state.annualEnergyChart;
    this.setState({ annualEnergyChart: !currentState });
  }
  toggleClassDegreeDays() {
    const currentState = this.state.annualDegreeDayChart;
    this.setState({ annualDegreeDayChart: !currentState });
  }
  toggleClassSqFt() {
    const currentState = this.state.overallSqFtCost;
    this.setState({ overallSqFtCost: !currentState });
  }

  render() {
    let historyCards = this.state.history.length > 0 &&
    this.state.history.map((curr, index) => {
      return (;
    return (
      <div className="dataBody">
        <Header />
        <a class="waves-effect waves-light" onClick={this.toggleClass}>
          <i class="material-icons">menu</i>
        </a>
        <div
          className={
            this.state.active
              ? "sideNavClose z-depth-5 grey lighten-5"
              : " z-depth-5 grey lighten-5 sideNavOpen"
          }
        >
          {this.state.active ? (
            <a class="waves-effect waves-light" onClick={this.toggleClass}>
              {/* <i class="material-icons">menu</i> */}
            </a>
          ) : (
            ""
          )}

          <Collapsible
            popout={true}
            accordion={true}
            onSelect={this.props.onSelect}
          >
            <CollapsibleItem header="Display Options">
              <Input name="ch" type="checkbox" label="Annual Use Cost" />
              <Input
                name="ch"
                type="checkbox"
                label="Annual Energy Consumption"
              />
              <Input name="ch" type="checkbox" label="Monthly Cost" />
              <Input
                name="ch"
                type="checkbox"
                label="Energy Utilization Analysis"
              />
            </CollapsibleItem>
            <CollapsibleItem header="Saved User Profiles" />
            <CollapsibleItem header="Hello"> "453" </CollapsibleItem>
          </Collapsible>
        </div>

        {/* <Link to="/dashboard">
          <Button className="backButton">Back to Dashboard</Button>
        </Link> */}
        {/* <h4 className="center-align">
          {this.props.projectLocation}`s Energy Profile
        </h4> */}
        <div className="gridholder">
          {this.state.annualCostTable && (
            <div className="dataTableHolder">
              <div className="boxes">
                <div className="borderHeaders">
                  <h5 className="headerText">Annual End Use Cost</h5>
                </div>

                <DataTable
                  headers={
                    (this.props.facility === "" &&
                      this.props.commercialHeaders) ||
                    (this.props.facility === "Commercial" &&
                      this.props.commercialHeaders) ||
                    (this.props.industry === "Petroleum" &&
                      this.props.petroleumHeaders) ||
                    (this.props.industry === "Chemical" &&
                      this.props.chemicalHeaders) ||
                    (this.props.industry === "Paper" &&
                      this.props.paperHeaders) ||
                    (this.props.industry === "Primary Metals" &&
                      this.props.metalsHeaders) ||
                    (this.props.industry === "Food" && this.props.foodHeaders)
                  }
                />
              </div>
            </div>
          )}

          {this.state.annualEnergyChart && (
            <div className="pieholder">
              <div className="boxes">
                <div className="borderHeaders">
                  <h5 className="headerText">
                    Annual End Use Energy Consumption
                  </h5>
                </div>
                <div className="charts">
                  <Pie
                    data={this.state.chartData}
                    options={{
                      title: {
                        display: this.props.displayTitle
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
          )}

          {this.state.annualDegreeDayChart && (
            <div className="barholder">
              <div className="boxes">
                <div className="borderHeaders">
                  <h5 className="headerText">
                    Monthly Cost vs. Monthly Temperature{" "}
                  </h5>
                </div>
                <div className="charts">
                  <Bar
                    data={this.state.chartData2}
                    options={{
                      title: {
                        display: this.props.displayTitle
                      },
                      legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                      },
                      scales: {
                        xAxes: {
                          gridLines: true
                        },
                        yAxes: [
                          {
                            id: "left-y-axis",
                            type: "linear",
                            position: "left",
                            gridLines: true
                          },
                          {
                            id: "right-y-axis",
                            type: "linear",
                            position: "right",
                            gridLines: true
                          }
                        ]
                      },
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {this.state.overallSqFtCost && (
            <div className="EnergyHolder">
              <div className="boxes">
                <div className="borderHeaders">
                  <h5 className="headerText">Energy Utilization Analysis</h5>
                </div>

                <div className="tables">
                  <EnergyTable />
                </div>
              </div>
            </div>
          )}
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
    updateAnnualCost,
    updateAnnualBreakdown,
    updateAnnualMonths,
    updateMonthlyCost,
    updateMonthlyDegreeDays,
    updateMonthlyKW,
    updateAnnualKW,
    updateProjectLocation,
    updateSquareFootage
  })(Data)
);
