import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "react-materialize";

import "./DataTable.css";

class DataTable extends Component {
  render() {
    console.log(this.props.headers);
    return (
      <div id="dataTable">
        <Table>
          <thead>
            <tr>
              <th data-field="id">Utility</th>
              <th data-field="price">Utility Cost</th>
            </tr>
          </thead>

          <tbody>
            {this.props.headers.map((curr, ind) => {
              return (
                <tr key={curr}>
                  <td key={curr}>{curr}</td>
                  <td>${this.props.annualCostBreakdownCommercial[ind]}</td>
                </tr>
              );
            })}
            <tr>
              <th>Utilities Total</th>
              <th>${this.props.annualCost}</th>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(DataTable);
