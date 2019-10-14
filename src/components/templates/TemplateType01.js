import React, { Component } from "react";
import { filePath } from "../Constants";
import { Icon } from "react-icons-kit";
import classNames from "classnames";
// import { bottom, redo } from 'react-icons-kit/iconic/';
import { ic_keyboard_arrow_right } from "react-icons-kit/md/";
import { plus } from "react-icons-kit/fa/";
import { CustomLink } from "../../components";
import Template1firstsection from "./template01/Template1firstsection";
import Template1secondsection from "./template01/Template1secondsection";
export default class TemplateType01 extends Component {
  isEmpty = item => {
    if (!item) return true;

    if (typeof item === "string") if (item.trim() === "") return true;

    return false;
  };
  renderThird = arr => {
    const list = arr.filter(el => !this.isEmpty(el));

    return (
      <ul className="icon-list">
        <div className="left-sec">
          {list.map((key, index) => {
            if (index % 2 === 0)
              return (
                <li key={index}>
                  <Icon icon={plus} />
                  {key}
                </li>
              );
            return null;
          })}
        </div>
        <div className="right-sec">
          {list.map((key, index) => {
            if (index % 2 !== 0)
              return (
                <li key={index}>
                  <Icon icon={plus} />
                  {key}
                </li>
              );
            return null;
          })}
        </div>
      </ul>
    );
  };
  render() {
    const { pagecontent, className } = this.props;

    return (
      <div
        className={classNames("body", {
          [className]: className
        })}
      >
        {pagecontent.firstsection &&
        pagecontent.firstsection.visibility === "yes" ? (
          <Template1firstsection content={pagecontent.firstsection} />
        ) : (
          ""
        )}
        {pagecontent.secondsection &&
        pagecontent.secondsection.visibility === "yes" ? (
          <Template1secondsection content={pagecontent.secondsection} />
        ) : (
          ""
        )}
        <div className=" pl-3 pr-3 ">
          {pagecontent.thirdsection &&
          pagecontent.thirdsection.visibility === "yes" ? (
            <div className="container  white-bg-p-80 border-top">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h4 className="main-sec-heading">
                    {pagecontent.thirdsection.thirdtitle}
                  </h4>
                  <p className="big-font">
                    {pagecontent.thirdsection.thirdfirstdescription}
                  </p>
                  {pagecontent.thirdsection &&
                  pagecontent.thirdsection.thirddiseases &&
                  pagecontent.thirdsection.thirddiseases.length > 0
                    ? this.renderThird(pagecontent.thirdsection.thirddiseases)
                    : ""}
                  {pagecontent.thirdsection.thirdseconddescription && (
                    <p className="big-font">
                      {pagecontent.thirdsection.thirdseconddescription}
                    </p>
                  )}
                </div>
              </div>
              <br />
              <br />
            </div>
          ) : (
            ""
          )}
          <div className="container   mt-5 pt-5 pb-5">
            <div className="row mt-5 text-md-left text-center align-items-center">
              {pagecontent.thirdsection.thirdbtntext && (
                <span>
                  <CustomLink
                    to={pagecontent.thirdsection.thirdbtnlink}
                    className="arrow-btn blue-bg-btn"
                  >
                    {pagecontent.thirdsection.thirdbtntext}
                    <Icon icon={ic_keyboard_arrow_right} />
                  </CustomLink>
                </span>
              )}
              {pagecontent.thirdsection.thirdslinktext && (
                <span>
                  <CustomLink
                    to={pagecontent.thirdsection.thirdsbtnlink}
                    className="arrow-btn btn"
                  >
                    {pagecontent.thirdsection.thirdslinktext}
                  </CustomLink>
                </span>
              )}
            </div>
          </div>

          {/* <div className="container ">
          <div className="row mobile-hide">
            <span>
              <a href={pagecontent.thirdsection.thirdbtnlink} className="arrow-btn blue-bg-btn">
              {pagecontent.thirdsection.thirdbtntext}
                <Icon icon={ic_keyboard_arrow_right} />
              </a>
            </span>
            <span>
              <a href={pagecontent.thirdsection.thirdsbtnlink} className="arrow-btn btn">
                {pagecontent.thirdsection.thirdslinktext}
              </a>
            </span>
          </div>
          <div className="row mobile-show">
            <span>
              <a href="#" className="arrow-btn blue-bg-btn">
                download our app
              </a>
            </span>
          </div>
        </div> */}

          {pagecontent.fourthsection &&
          pagecontent.fourthsection.visibility === "yes" ? (
            <div className="container  no-padding" style={{ width: "97%" }}>
              <div className="row padding-equal">
                {pagecontent.fourthsection.fourthimage.length > 0
                  ? pagecontent.fourthsection.fourthimage.map((img, index) => {
                      if (img || pagecontent.fourthsection.fourthtitle[index]) {
                        return (
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <CustomLink
                              to={
                                pagecontent.fourthsection.fourthlink[index]
                                  ? pagecontent.fourthsection.fourthlink[index]
                                  : "#"
                              }
                            >
                              <div className="img-wrapper">
                                {img && <img src={filePath + img} alt={img} />}
                                <h3>
                                  {pagecontent.fourthsection.fourthtitle[index]}
                                </h3>
                              </div>
                            </CustomLink>
                          </div>
                        );
                      }

                      return null;
                    })
                  : ""}

                {/* <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="img-wrapper">
                <img srcSet="//www.doctorondemand.com/img/preventivehealth-img@2x.jpg" />
                <h3>Preventive Health</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="img-wrapper">
                <img srcSet="//www.doctorondemand.com/img/chronic-care-img@2x.jpg" />
                <h3>Chronic Care</h3>
              </div>
            </div> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
