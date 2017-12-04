import React, { Component } from "react";
import { connect } from "react-redux";

import "./EnergyTable.css";

class EnergyTable extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr className="tableRowEnergy">
              <td className="boldRows">Max KW/SF</td>
              <td>
                {(
                  Math.max(...this.props.monthlyKW) / this.props.squareFootage
                ).toFixed(2)}{" "}
                kw/ sq ft
              </td>
            </tr>
            <tr className="tableRowEnergy">
              <td className="boldRows">Min KW/SF</td>
              <td>
                {(
                  Math.min(...this.props.monthlyKW) / this.props.squareFootage
                ).toFixed(2)}{" "}
                kw/ sq ft
              </td>
            </tr>
            <tr className="tableRowEnergy">
              <td className="boldRows">Avg KW/SF</td>
              <td>
                {(
                  this.props.annualKW /
                  this.props.monthlyKW.length /
                  this.props.squareFootage
                ).toFixed(2)}{" "}
                kw/ sq ft
              </td>
            </tr>
            <tr className="tableRowEnergy">
              <td className="boldRows">Cost/SF Electric</td>
              <td>
                ${(this.props.annualCost / this.props.squareFootage).toFixed(2)}{" "}
                $/sq ft
              </td>
            </tr>
            <tr className="tableRowEnergy">
              <td className="boldRows">Building Area</td>
              <td>{this.props.squareFootage} sq ft</td>
            </tr>
          </tbody>
        </table>
        {/* <Table>
          <thead>
            <tr>
              <th data-field="id">Utility</th>
              <th data-field="price">Utility Cost</th>
            </tr>
          </thead>

          <tbody>
            <tr key={curr}>
              <td key={curr}>{curr}</td>
              <td>${this.props.annualCostBreakdown[ind]}</td>
            </tr>

            <tr>
              <th>Utilities Total</th>
              <th>${this.props.annualCost}</th>
            </tr>
          </tbody>
        </Table> */}
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(EnergyTable);
