import React, { Component } from "react";
// import classNames from 'classnames'
import { connect } from "react-redux";
import { Input, TextArea, fieldValidation } from "../form";
import FiveStars from "./FiveStars";
import { postReview, clearReviewPosted } from "../../actions";
import {
  writeReview,
  headlineMissing,
  reviewMissing
} from "../../constantMessage";

class AddReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      review: "",
      overall: 1,
      effectiveness: 1,
      quality: 1,
      vmoney: 1
    };
  }
  onSubmit = async e => {
    e.preventDefault();
    const matchArr = [
      {
        name: "overall",
        check: "rating"
      },
      {
        name: "effectiveness",
        check: "rating"
      },
      {
        name: "quality",
        check: "rating"
      },
      {
        name: "vmoney",
        check: "rating"
      },
      {
        name: "title",
        check: "required"
      },
      {
        name: "review",
        check: "required"
      }
    ];
    const flagArray = matchArr.map(el => {
      const { isError, errorMsg } = fieldValidation(
        this.state[el.name],
        el.check
      );
      this.setState({
        [`${el.name}Err`]: isError,
        [`${el.name}ErrMsg`]: errorMsg
      });
      return !isError;
    });
    const check = flagArray.every(el => el);
    if (check) {
      const {
        title,
        review: content,
        overall,
        effectiveness,
        quality,
        vmoney
      } = this.state;
      const {
        postReview,
        productId,
        user: { _id: userid, userMetaId: usermetaid },
        orderId,
        isCombo,
        countryCode
      } = this.props;
      const review = {
        title,
        content,
        overall,
        effectiveness,
        quality,
        vmoney,
        userid,
        usermetaid,
        orderid: orderId,
        isCombo
      };
      if (isCombo)
        postReview(
          {
            ...review,
            comboid: productId
          },
          countryCode
        );
      else
        postReview(
          {
            ...review,
            productmetaid: productId
          },
          countryCode
        );

      this.setState({
        isPosted: true
      });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isPosted) {
      if (this.state.isPosted) {
        this.setState({
          isPosted: false
        });
        if (typeof this.props.onSubmit === "function") this.props.onSubmit();
        setTimeout(() => {
          this.props.clearReviewPosted();
        }, 1000);
      }
    }
  }
  onTextChange = e => {
    const { value, name } = e.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        const { isError, errorMsg } = fieldValidation(value, "required");
        this.setState({
          [`${name}Err`]: isError,
          [`${name}ErrMsg`]: errorMsg
        });
      }
    );
  };
  changeRating = {
    main: e => {
      this.setState({
        overall: e
      });
    },
    effectiveness: e => {
      this.setState({
        effectiveness: e
      });
    },
    quality: e => {
      this.setState({
        quality: e
      });
    },
    vmoney: e => {
      this.setState({
        vmoney: e
      });
    }
  };
  render() {
    const {
      title,
      overall,
      review,
      effectiveness,
      quality,
      vmoney,
      titleErr,
      reviewErr,
      titleErrMsg,
      reviewErrMsg
    } = this.state;
    return (
      <div className="add-review-wrapper">
        <div className="add-review-inner">
          <form onSubmit={this.onSubmit}>
            <div className="title-80 mb-4 text-center">{writeReview}</div>
            <div className="row">
              <div className="col-12">
                <p>Overall rating</p>
              </div>
              <div className="mb-3 w-100">
                <FiveStars
                  onChange={this.changeRating.main}
                  size={25}
                  rating={overall}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-12">
                <p>Rate features</p>
              </div>
              <div className="row w-100">
                <div className="col-lg-4">
                  <div className="col-12">
                    <p>Effectiveness</p>
                  </div>
                  <div className="mb-3 w-100">
                    <FiveStars
                      size={18}
                      onChange={this.changeRating.effectiveness}
                      rating={effectiveness}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="col-12">
                    <p>Quality</p>
                  </div>
                  <div className="mb-3 w-100">
                    <FiveStars
                      size={18}
                      onChange={this.changeRating.quality}
                      rating={quality}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="col-12">
                    <p>Value for money</p>
                  </div>
                  <div className="mb-3 w-100">
                    <FiveStars
                      size={18}
                      onChange={this.changeRating.vmoney}
                      rating={vmoney}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Input
              name="title"
              label="Add a headline"
              maxLength="50"
              onChange={this.onTextChange}
              value={title}
              isError={titleErr}
              errorMsg={
                titleErrMsg === "can't be empty" ? headlineMissing : titleErrMsg
              }
            />
            <TextArea
              name="review"
              label="Write your review"
              onChange={this.onTextChange}
              value={review}
              isError={reviewErr}
              errorMsg={
                reviewErrMsg === "can't be empty" ? reviewMissing : reviewErrMsg
              }
            />
            <button className="btn2">Submit</button>
            <div>
              <br className="pb-sm-3 pb-md-5" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isPosted: state.reviews.isPosted,
  countryCode: state.location.countryCode
});

export default connect(
  mapStateToProps,
  { postReview, clearReviewPosted }
)(AddReviews);
