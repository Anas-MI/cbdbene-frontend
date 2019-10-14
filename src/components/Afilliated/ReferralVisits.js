import React, { Component } from "react";
import { Table } from "reactstrap";
import { Icon } from "react-icons-kit";
import { ic_done, ic_clear } from "react-icons-kit/md";
import moment from "moment";
import BasicFunction from "../../services/extra/basicFunction";
const basicFunction = new BasicFunction();
export default class ReferralVisits extends Component {
  renderVisitRow(arr) {
    if (arr)
      return arr.map((el, index) => (
        <tr key={index}>
          <th data-label="URL" scope="row">
            {el.url}
          </th>
          <td data-label="Referring URL">
            {basicFunction.returnReferringUrl(el.refer_url)}
          </td>
          <td data-label="Converted" className="inline-data">
            {el.converted ? <Icon icon={ic_done} /> : <Icon icon={ic_clear} />}
          </td>
          <td data-label="Date">
            {moment(el.date).format("MMMM Do, YYYY h:mm a")}
          </td>
        </tr>
      ));
  }
  render() {
    const { ambassador_data } = this.props;
    return (
      <div>
        <Table
          className="visitor-table table-responsive-md new-res-table"
          bordered
        >
          <thead>
            <tr>
              <th>URL</th>
              <th>Referring URL</th>
              <th>Converted</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ambassador_data &&
            ambassador_data.urlvisits &&
            ambassador_data.urlvisits.length > 0 ? (
              this.renderVisitRow(ambassador_data.urlvisits)
            ) : (
              <tr>
                <td colSpan="4">None of your referrals.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}
