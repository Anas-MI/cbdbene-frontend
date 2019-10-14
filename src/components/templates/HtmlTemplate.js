import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
export default class HtmlTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pagecontent } = this.props;
    return (
      <div>
        <div className="container-fluid pl-0 pr-0">
          {ReactHtmlParser(pagecontent)}
        </div>
      </div>
    );
  }
}
