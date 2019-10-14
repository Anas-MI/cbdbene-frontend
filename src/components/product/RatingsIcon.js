import React from "react";

import { Icon } from "react-icons-kit";
import { starFull, starEmpty, starHalf } from "react-icons-kit/icomoon/";

const RatingsIcon = props => {
  const StarCount = [0, 1, 2, 3, 4];
  const { noText, totalRating: rating, onReviewClick } = props;
  const scrollToReview = () => {
    document.body.scrollTop = document.documentElement.scrollTop = document.getElementById("reviewId").offsetTop;
    if(typeof onReviewClick === "function")
      onReviewClick()
    //document.getElementById("reviewId").offsetTop
  }
  return (
    <div className="rating-icon pt-1 pb-2">
      {StarCount.map((el, index) => {
        if (rating >= index + 1) {
          return <Icon key={index} icon={starFull} />;
        } else {
          if (rating > parseFloat(index + 0.4)) {
            return <Icon key={index} icon={starHalf} />;
          } else {
            return <Icon key={index} icon={starEmpty} />;
          }
        }
      })}

      {!noText && (
        <span 
        onClick={scrollToReview}
        className="cursor-pointer"
        >
          <span
            className="small"
            style={{ display: "inline-block", paddingLeft: 10 }}
          >
            {" "}
            {props.totalReview} reviews
          </span>
        </span>
      )}
    </div>
  );
};

export default RatingsIcon;
