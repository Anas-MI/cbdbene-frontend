import React, { Component } from "react";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
export default class Referrals extends Component {
  renderReferralRow(arr) {
    if (arr) {
      return arr
        .filter(el => el.amount > 0)
        .map((key, index) => (
          <tr key={index}>
            <th data-label="Reference">
              <a href={key.refer_url}>
                {key.refer_url ? key.refer_url : "Direct traffic"}
              </a>
            </th>
            <td data-label="Amount" className="inline-data">
              {basicFunction.currancyAddWithNumber(key.amount)}
            </td>
            <td data-label="Status" className="inline-data">
              {key.paid ? "Paid" : "UnPaid"}
            </td>
            <td data-label="Date" className="inline-data">
              {basicFunction.dateTimeInMonthName(key.date)}
            </td>
          </tr>
        ));
    }
  }
  render() {
    const { ambassador_data, totalCount } = this.props;

    return (
      <div>
        <table className="table table-responsive-md table-bordered referral-table new-res-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.renderReferralRow(ambassador_data.urlvisits)}
            {totalCount === 0 && (
              <tr>
                <td colSpan="4">You have not made any referrals yet. </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
