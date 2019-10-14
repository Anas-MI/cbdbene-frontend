import React, { Component } from "react";
export default class Creatives extends Component {
  generateSnippet = (referral, url = window.location.origin, image) => {
    if (referral) {
      const img = image ? `<img src="${image}"  alt="${image}" />` : "";
      const link = `<a href="${url}?ref=${referral}" >${img}</a>`;
      return (
        <div
          style={{ width: "100%" }}
          onClick={this.copyText}
          className="snippet-text p-3"
        >
          {link}
        </div>
      );
    }

    return "";
  };
  render() {
    const { creatives, ambassador } = this.props;
    return (
      <div>
        <ul className="list-group">
          {creatives && creatives.length > 0 && (
            <li className="list-group-item d-none d-md-block">
              <div className="row">
                <div className="col-md-3">Image</div>
                <div className="col-md-3">Name</div>
                {/* <div className="col-md-2">Size</div> */}
                <div className="col-md-6">Snippet</div>
              </div>
            </li>
          )}
          {creatives &&
            creatives.map((el, index) => (
              <li key={index} className="list-group-item ">
                <div className="row">
                  <div className="col-md-3">
                    {el.image && (
                      <b className="d-md-none list-label pr-3">Image</b>
                    )}
                    {el.image}
                  </div>
                  <div className="col-md-3">
                    {el.title && (
                      <b className="d-md-none list-label pr-3">Name</b>
                    )}
                    {el.title}
                  </div>
                  {/* {el.image && <div className="col-md-2">
                  <span className="d-md-none list-label pr-3">Size</span>
                  {el.image}</div>} */}
                  <div className="col-md-6">
                    <b className="d-md-none list-label pr-3">Snippet</b>
                    {this.generateSnippet(
                      ambassador.ambass_id,
                      el.link,
                      el.image
                    )}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
