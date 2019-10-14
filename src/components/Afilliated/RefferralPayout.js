import React, { Component } from "react";
import { Table } from "reactstrap";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
export default class RefferralPayout extends Component {
  payoutFatch(ambassador_data) {
    return ambassador_data.urlvisits.map(
      (key, index) =>
        key.paid && (
          <tr key={index}>
            <th>{basicFunction.dateTimeInMonthName(key.paidon)}</th>
            <td>
              {basicFunction.currancyAddWithNumber(
                basicFunction.getParchantage(25, key.amount)
              )}
            </td>
            <td>Paid</td>
          </tr>
        )
    );
  }
  render() {
    const { ambassador_data, countPaid } = this.props;
    return (
      <div>
        {ambassador_data && ambassador_data.urlvisits && (
          <Table bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.payoutFatch(ambassador_data)}
              {countPaid === 0 && (
                <tr>
                  <td colSpan="4">
                    None of your referrals have been paid out yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}
