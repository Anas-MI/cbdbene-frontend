import React, { Component } from "react";
import moment from "moment";
// import { RatingsIcon } from "../product";
import FiveStars from "./FiveStars";
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2019-06-29T05:25:52.785Z",
      title: "So far. So good.",
      content: "Only 2 months. Way a little more.",
      name: "Anonyomous"
    };
  }
  render() {
    // const { name,  } = this.state;
    const getName = user => {
      if (user && typeof user === "object") return user.firstname;

      return "Anonyomous";
    };
    const { createdOn, content, title, overall, usermetaid } = this.props;
    const name = getName(usermetaid);
    const getFirst = name => name.split("")[0].toUpperCase();

    return (
      <div className="review-main-wrapper">
        <div className="review-user-wrap">
          <div className="review-user-image">
            <span>{getFirst(name)}</span>
          </div>

          <FiveStars onChange={overall} size={16} rating={overall} />
        </div>
        <div className="review-content-wrap">
          <div className="review-user-info-line">
            <div className="review-user-name">
              <p>{name}</p>
            </div>
            <div className="review-date">
              <p>{moment(createdOn).format("MMMM Do, YYYY")}</p>
            </div>
          </div>
          <div className="review-user-content-line">
            <h3 className="product-title">{title}</h3>
            <p className="review__content">{content}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Review;
