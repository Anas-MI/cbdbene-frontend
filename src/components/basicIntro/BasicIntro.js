import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class BasicIntro extends Component {
  render() {
    const { description, title, smallTitle, btnText } = this.props;
    return (
      <div>
        <div className="basic-intro-continer span-24 section1 cms_disp-img_slot">
          <div className="MCRow">
            <section className="MCLeftCopy">
              <div className="MCLeftCopy-wrapper">
                <h5 className="MCLeftCopy-eyebrow">{smallTitle}</h5>
                <h2 className="MCLeftCopy-title">{title}</h2>
                <div className="MCLeftCopy-copy" />
                <ul className="MCLinkList" />
              </div>
            </section>
            <section className="MCBodyCopy">
              <div className="MCBodyCopy-wrapper">
                <div className="MCBodyCopy-copy">
                  <p className="MCBodyCopy-copyParagraph">{description}</p>
                </div>

                <ul className="MCLinkList">
                  <li className="MCLinkList-linkItem">
                    <Link
                      className="Link Link--isBtn MCLinkList-link Link--hasIcon"
                      to={`/${this.props.location.countryCode}/category/Oils`}
                    >
                      {" "}
                      <span className="Link-content">
                        {btnText}
                        <svg
                          className="Icon Link-icon"
                          role="img"
                          viewBox="0 0 50 50"
                        >
                          <g>
                            <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                          </g>
                        </svg>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(state => ({ location: state.location }))(BasicIntro);
