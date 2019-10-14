import React, { Component } from "react";
import classNames from "classnames";
import Review from "./Review";

const SortBtn = ({ isActive, onClick, label }) => (
  <span
    className={classNames(
      "m-3 Link Link--isBtn cursor-pointer text-center align-items-center justify-content-center",
      {
        active: isActive
      }
    )}
    onClick={onClick}
  >
    {label}
  </span>
);
class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      sortedReview: props.reviews,
      sorted: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews !== this.props.reviews) {
      this.setState(
        {
          reviews: nextProps.reviews
        },
        () => {
          this.sort();
        }
      );
    }
  }
  sort = key => {
    const { reviews } = this.state;
    const sortedReview = reviews.sort((a, b) => {
      const timeA = new Date(a.createdOn).getTime();
      const timeB = new Date(b.createdOn).getTime();
      switch (key) {
        case "highest":
          return a.overall - b.overall;

        case "lowest":
          return b.overall - a.overall;

        case "newest":
          return timeB - timeA;

        case "oldest":
          return timeA - timeB;

        default:
          return 0;
      }
    });
    this.setState({
      sortedReview,
      sorted: key
    });
  };
  render() {
    const { sortedReview, sorted } = this.state;
    const list = sortedReview.map((el, index) => (
      <Review key={index} {...el} />
    ));
    return (
      <div className="review-list">
        {sortedReview.length > 0 && (
          <div className="row justify-content-center">
            <SortBtn
              isActive={sorted === "highest"}
              label="Hightest Rated"
              onClick={() => {
                this.sort("highest");
              }}
            />
            <SortBtn
              isActive={sorted === "lowest"}
              label="Lowest Rated"
              onClick={() => {
                this.sort("lowest");
              }}
            />
            <SortBtn
              isActive={sorted === "newest"}
              label="Newest"
              onClick={() => {
                this.sort("newest");
              }}
            />
            <SortBtn
              isActive={sorted === "oldest"}
              label="Oldest"
              onClick={() => {
                this.sort("oldest");
              }}
            />
          </div>
        )}
        {list}
      </div>
    );
  }
}

export default ReviewList;
