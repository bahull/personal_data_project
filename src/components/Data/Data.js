import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

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
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      }
    };
  }

  componentWillMount() {
    console.log("Front hit", this.props);
    axios.get("/api/me").then(response => {
      if (!response.data) this.props.history.push("/");
      if (!response.data.newFile) {
      } else {
        let newArray = [];
        let newData = response.data.newFile;
        console.log("response.data.newFile: ", response.data.newFile);
        let changedArray = function() {
          newData.splice(0, 1);
          return newData.map(function(current) {
            newArray.push(parseFloat(current[2].replace(",", "")));
          });
          // => newArray.push(current[2])));
        };
        changedArray(newData);
        // .map(x => newArray.push(x[2])).pop()
        console.log("get to the chopper:", newArray);
        let newState = Object.assign({}, this.state);
        newState.chartData.datasets[0].data = newArray;
        console.log(newState);
        this.setState(newState);
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <h3>
          {this.props.projectLocation}
          <br />
          {this.props.address}
          <br />
          {this.props.facility}
          <br />
          {this.props.squareFootage}
          <br />
        </h3>

        <Bar
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Data);
