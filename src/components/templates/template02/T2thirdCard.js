import React, { Component } from "react";
import { filePath } from "../../Constants";
import { CustomLink } from "../../";
export default class T2thirdCard extends Component {
  render() {
    const { content } = this.props;
    return (
      <div className="feature tile">
        <div className="tile-inner">
          <div className="tile-img">
            {content.img && (
              <picture>
                <img srcset={filePath + content.img} alt={content.img} />
              </picture>
            )}
          </div>
          <div className="tile-text-wrapper">
            <div className="tile-title">{content.title} </div>
            {content.description && (
              <div className="tile-text">
                <p>{content.description}</p>
              </div>
            )}
            {content.btntext && (
              <div className="tile-meta">
                <CustomLink
                  className="button btn btn-outline-main"
                  to={content.btnlink}
                >
                  {content.btntext}
                </CustomLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
