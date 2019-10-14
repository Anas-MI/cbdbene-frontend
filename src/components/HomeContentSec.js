import React, { Component } from "react";
import { CustomLink } from "./";
import { filePath } from "./Constants";
export class HomeContentSec extends Component {
  render() {
    const {
      props: { stitle, title, description, imagelink, btntext, btnlink }
    } = this;
    return (
      <div className="next-content-1">
        <div className="next-sec-1">
          {stitle && <h5>{stitle}</h5>}
          <h3>{title}</h3>
          <p>{description}</p>
          {btntext && btntext.trim() !== "" && (
            <div className="write-btn-1">
              <CustomLink to={btnlink ? btnlink : "#"}>
                {btntext}
                <svg className="Icon Link-icon" role="img" viewBox="0 0 50 50">
                  <g>
                    <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                  </g>
                </svg>
              </CustomLink>
            </div>
          )}
        </div>
        {imagelink ? (
          <div
            className="next-sec-2"
            // style={{
            //   backgroundImage: `url(${filePath + imagelink})`
            // }}
          >
            <picture className="Picture MCSquareImage-img">
              <source srcSet={filePath + imagelink} />
              <img alt={imagelink} />
            </picture>
          </div>
        ) : (
          <div className="next-sec-2" />
        )}
      </div>
    );
  }
}
