import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { ic_add_circle } from "react-icons-kit/md/ic_add_circle";
import $ from "jquery";

export class Faqs extends Component {
  constructor() {
    super();
    this.state = {
      reviewCount: 20,
      reviews: [
        {
          content: "Best cbd oil around.",
          title: "LOVE THIS PRODUCT"
        },
        {
          content:
            "You guys have a great product, but your shipping is horrible. A product this expensive should be shipped priority mail. This is definitely hurting your brand. Are you really all of the complaints? Hello Customer Service, wake up! I am going to go to a different provider. There are other good ones on the market, you just have to a little research.",
          title: "SHIPPING REALLY SUCKS..."
        },
        {
          content:
            "Love the taste of the mint chocolate! Fan of the product itself (first time user)",
          title: "GREAT PRODUCT"
        }
      ],
      selectedId: null
    };
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  renderReviews() {
    const { faqList } = this.props;
    return faqList.map((faq, index) => {
      const { description, title } = faq;
      return (
        <div className="review-container" key={index}>
          <div className="review" data-acc-id={"review" + index}>
            <div className="review-title-container">
              <p className="review-title">{title}</p>
              <div
                className="tgl-btn"
                onClick={e => {
                  $(e.target)
                    .closest(".review")
                    .find(".review-content-container")
                    .slideToggle();
                  $(e.target)
                    .closest(".review")
                    .find(".tgl-btn")
                    .toggleClass("opened");
                }}
              >
                <Icon size={20} icon={ic_add_circle} />
              </div>
            </div>
            <div className="review-content-container hide">
              <p className="review-content">{description}</p>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    const { faqList } = this.props;
    return (
      <div
        style={{
          borderBottom: 0
        }}
        className="review-main-wrapper"
      >
        {/* <div className="review-header">
          <h2 className="MCItemCarouselIntro-title">FAQ</h2>
        </div> */}
        {faqList.length >= 1 && faqList[0].title !== "" && (
          <div className="review-container-wrapper">{this.renderReviews()}</div>
        )}
      </div>
    );
  }
}
