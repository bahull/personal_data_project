import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "react-materialize";

import "./DataTable.css";

class DataTable extends Component {
  render() {
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
            {this.props.metalsHeader.map(curr => {
              return (
                <tr>
                  <td>{curr}</td>
                  <td>{this.props.annualCost}</td>
                </tr>
              );
            })}
            <tr>
              <td>Alvin</td>
              <td />
            </tr>
            <tr>
              <td>Alan</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>$7.00</td>
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
