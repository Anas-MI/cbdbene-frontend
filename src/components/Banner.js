import React, { Component } from "react";

import { CustomLink } from "./";
export class Banner extends Component {
  render() {
    const { title, description, btntext, imagelink, btnlink } = this.props;
    return (
      <div>
        <div className="img_header_sec">
          <div className="written_sec">
            <div className="written_sec_a">
              <div className="content_section">
                <h2>{title}</h2>
                {/* <CustomLink to="http://www.google.com">adsf</CustomLink> */}
              </div>
              <div className="content_section_2">
                <p>{description}</p>
              </div>
              {btntext !== "" && (
                <div className="content_section_3">
                  <CustomLink to={btnlink ? btnlink : "#"}>
                    {btntext}
                    <svg
                      className="Icon Link-icon"
                      role="img"
                      viewBox="0 0 50 50"
                    >
                      <g>
                        <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                      </g>
                    </svg>
                  </CustomLink>
                </div>
              )}
            </div>
          </div>

          <div className="img_sec header-img-sec">
            {imagelink && <img src={imagelink} alt="header-img" />}
          </div>
        </div>
      </div>
    );
  }
}
