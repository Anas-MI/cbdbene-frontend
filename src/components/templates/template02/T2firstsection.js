import React, { Component } from "react";
import { filePath } from "../../Constants";
export default class T2firstsection extends Component {
  isEmpty = str => {
    if (str) {
      if (str.trim() !== "") return false;
    }
    return true;
  };
  isAllEmpty = arr => !arr.some(el => !this.isEmpty(el));
  render() {
    const { content } = this.props;

    return (
      <div>
        {!this.isAllEmpty([content.firstimage]) && (
          <div className="heropar pagehero">
            <div className="article-hero">
              <picture>
                {content.firstimage && (
                  <img
                    srcSet={filePath + content.firstimage}
                    alt={content.firstimage}
                  >
                    {/* <!-- Fallback --> */}
                  </img>
                )}
              </picture>
            </div>
          </div>
        )}
        {this.isAllEmpty([content.firstimage]) && <div className="first_sec" />}
        {!this.isAllEmpty([content.title, content.author]) && (
          <div className="titlepar storydetail">
            <div className="article-info-wrapper container">
              <div className="article-info">
                {content.date && <span className="date">{content.date}</span>}
                <h1>{content.title}</h1>
                <span className="author">{content.author}</span>
                <br />
              </div>
            </div>
          </div>
        )}
        {!this.isAllEmpty([content.description]) && (
          <div className="article-content container">
            <div className="row">
              <div className="text-component section w-100">
                <div className="richtext">
                  <p>
                    <br />
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
