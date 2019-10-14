import React, { Component } from "react";
import FiveStars from "./FiveStars";
import ProgressSlide from "./ProgressSlide";

const ReviewLine = ({ rating, number = 10, total }) => {
  const progress = (number / total) * 100;

  return (
    <div className="review-info-line">
      <div className="review-info-left-content">
        <FiveStars rating={rating} />
        <div className="star-counts">({number})</div>
      </div>
      <div className="review-info-right-content">
        <ProgressSlide progress={progress} />
      </div>
    </div>
  );
};

const getLength = (reviews, rate) =>
  reviews.filter(el => el.overall === rate).length;

export default class ReviewInfo extends Component {
  render() {
    const { reviews } = this.props;
    const five = getLength(reviews, 5),
      four = getLength(reviews, 4),
      three = getLength(reviews, 3),
      two = getLength(reviews, 2),
      one = getLength(reviews, 1);
    return (
      <div className="review-info-wrapper">
        <ReviewLine rating={5} total={reviews.length} number={five} />
        <ReviewLine rating={4} total={reviews.length} number={four} />
        <ReviewLine rating={3} total={reviews.length} number={three} />
        <ReviewLine rating={2} total={reviews.length} number={two} />
        <ReviewLine rating={1} total={reviews.length} number={one} />
      </div>
    );
  }
}
