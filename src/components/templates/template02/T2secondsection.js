import React, { Component } from "react";
import { filePath } from "../../Constants";
export default class T2secondsection extends Component {
  render() {
    const { content } = this.props;
    return (
      <div>
        {content.imagelink && (
          <div className="par parsys">
            <div className="image section">
              {content.imagelink && (
                <img
                  className="img-fluid"
                  src={filePath + content.imagelink}
                  alt="hero-img"
                />
              )}
            </div>
          </div>
        )}
        {content.map((el, i) => (
          <div key={i} className="richtext">
            {el.image && (
              <div className="par parsys">
                <div className="image section">
                  {el.image && (
                    <img
                      className="img-fluid"
                      src={filePath + el.image}
                      alt={el.image}
                    />
                  )}
                </div>
              </div>
            )}
            {el.title && (
              <h2>
                <br />
                {el.title}
              </h2>
            )}
            {el.description && (
              <p>
                {el.description}
                <br />
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
}
