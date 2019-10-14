import React, { Component } from "react";
import classNames from "classnames";
export default class Accessibility extends Component {
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  render() {
    const { className } = this.props;
    return (
      <div
        className={classNames("container-extend pb-5 min-vh-100", {
          [className]: className
        })}
      >
        <div className="text-center">
          <h2 className="pb-5">Website Accessibility</h2>
        </div>
        <div className="pb-3">
          <h3 className="pb-2">Welcome to CBD Bené</h3>
          <div className="pl-3 pr-3">
            <p>
              Bené LLC, a Delaware limited liability company d/b/a CBD Bené
              collectively referred to in this privacy policy as “CBD Bené,” the
              “Company” or sometimes “we” or “us” or “our”), operates the
              website located at the URL www.CBDBene.com (together with any
              other website or applications branded as CBD Bené (collectively,
              the “Website”). CBD Bené is committed to making our website
              accessible to all our customers. We have been making changes to
              improve website accessibility and will continue to monitor and
              make improvements going forward. If you would like to send us
              feedback about our website, please contact us using the email:{" "}
              <a href="mailto:customerservice@cbdbene.com">
                customerservice@cbdbene.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
