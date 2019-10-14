import React, { Component } from "react";
import classNames from "classnames";
import T2firstsection from "./template02/T2firstsection";
import T2secondsection from "./template02/T2secondsection";
import T2thirdsection from "./template02/T2thirdsection";
import T2thirdCard from "./template02/T2thirdCard";
import T2fourthsection from "./template02/T2fourthsection";
export default class TemplateType02 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log({pagecontent: this.props.pagecontent}, this.props.pagecontent.thirdsection)
  }
  renderFourthContent(fourthsection) {
    if (fourthsection.constructor === Array)
      return fourthsection
        .filter(el => !this.isEmpty(el.title) || !this.isEmpty(el.description))
        .map((el, key) => {
          return <T2fourthsection key={key} {...el} />;
        });
  }
  isEmpty = item => {
    if (!item) return true;

    if (typeof item === "string") if (item.trim() === "") return true;

    return false;
  };
  render() {
    const { pagecontent, className } = this.props;

    return (
      <div
        className={classNames("", {
          [className]: className
        })}
      >
        <article className="article">
          {pagecontent &&
            pagecontent.firstsection &&
            pagecontent.firstsection.visibility === "yes" && (
              <T2firstsection content={pagecontent.firstsection} />
            )}
          <div className="article-content container">
            {pagecontent &&
              pagecontent.secondsection &&
              pagecontent.secondVisbility === "yes" &&
              pagecontent.secondsection.length > 0 && (
                <T2secondsection content={pagecontent.secondsection} />
              )}
            {/* <T2secondsection /> */}
            {pagecontent &&
              pagecontent.thirdsection &&
              pagecontent.thirdVisbility === "yes" &&
              pagecontent.thirdsection.length > 0 && (
                <T2thirdsection>
                  {pagecontent.thirdsection
                    .filter(
                      el =>
                        !this.isEmpty(el.title) || !this.isEmpty(el.description)
                    )
                    .map((el, key) => {
                      return <T2thirdCard content={el} key={key} />;
                    })}
                </T2thirdsection>
              )}
            {pagecontent &&
              pagecontent.fourthVisbility === "yes" &&
              pagecontent.fourthsection.length > 0 &&
              this.renderFourthContent(pagecontent.fourthsection)}
            <T2thirdsection />
          </div>
        </article>
      </div>
    );
  }
}
