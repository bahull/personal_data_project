import React, { Component } from "react";
import Header from "./../Header/Header";
import axios from "axios";
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
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
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

  componentDidMount() {
    console.log("Front hit", this.props);
    axios.get("/api/me").then(response => {
      console.log(response.data);
      if (!response.data) this.props.history.push("/");
      let newArray = [];
      let newData = response.data.newFile;
      console.log("get to the chopper bastard:", newData);
      let changedArray = function() {
        console.log("newData in function: ", newData);
        newData.splice(0, 1);
        return newData.map(function(current) {
          newArray.push(parseFloat(current[2].replace(",", "")));
          console.log(current[2]);
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
    });
  }
  render() {
    return (
      <div>
        <Header />
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

export default Data;
