import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { Scrollbars } from "react-custom-scrollbars";
import { ic_clear } from "react-icons-kit/md";
import { starFull, starEmpty } from "react-icons-kit/icomoon/";
import StarRatings from "react-star-ratings";
import { Modal, ModalHeader } from "reactstrap";
import waterfall from "async-waterfall";
import { connect } from "react-redux";
import classNames from "classnames";
import { addReview, getReviewByProductId } from "../services/api";
import {
  addReviewMessage,
  withoutLoginReviewMessage,
  passwordMatchErrMsg
} from "../constantMessage";
import { isAlpha, isEmail, isEmpty, isMobilePhone, isNumeric } from "validator";

class ReviewsClass extends Component {
  constructor() {
    super();
    this.handleReviewName = this.handleReviewName.bind(this);
    this.handleReviewContent = this.handleReviewContent.bind(this);
    this.handleReviewTitle = this.handleReviewTitle.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.fieldVaidation = this.fieldVaidation.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addReviewOpen = this.addReviewOpen.bind(this);
    this.state = {
      reviewCount: 20,
      StarRating: 3,
      StarRatinng_err: false,
      StarRatinng_errMsg: "",
      addReviewOpen: false,
      reviews: [
        {
          name: "PARRY",
          content: "Best cbd oil around.",
          title: "LOVE THIS PRODUCT",
          ratings: 5
        },
        {
          name: "JOHNNY",
          content:
            "You guys have a great product, but your shipping is horrible. A product this expensive should be shipped priority mail. This is definitely hurting your brand. Are you really all of the complaints? Hello Customer Service, wake up! I am going to go to a different provider. There are other good ones on the market, you just have to a little research.",
          title: "SHIPPING REALLY SUCKS...",
          ratings: 3
        },
        {
          name: "LOLA",
          content:
            "Love the taste of the mint chocolate! Fan of the product itself (first time user)",
          title: "GREAT PRODUCT",
          ratings: 4
        }
      ],
      reviewName: "",
      reviewName_err: null,
      reviewName_errMsg: "",
      reviewContent: "",
      reviewContent_err: null,
      reviewContent_errMsg: "",
      reviewTitle: "",
      reviewTitle_err: null,
      reviewTitle_errMsg: "",
      showModal: false,
      isLoading: false,
      loginUserId: "",
      loginShow: false,
      reviewsList: "",
      avgRating: 0,
      modalData: {
        title: "",
        msg: ""
      }
    };
  }
  componentDidMount() {
    const { user, product } = this.props;
    if (user._id) {
      this.setState({
        loginUserId: user._id,
        loginShow: true
      });
    }

    getReviewByProductId({
      productid: product.combo ? product._id : product.productid._id
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.status) {
          this.setState({
            reviewsList: resJson.reviews
          });
          // avgRating
          const size = resJson.reviews.length;
          if (size > 0) {
            var totalRating = 0;
            resJson.reviews.map((rat, index) => {
              totalRating = parseInt(totalRating) + parseInt(rat.rating);
              return null;
            });
            totalRating = parseFloat(totalRating) / size;

            this.setState({
              avgRating: totalRating
            });
            const resParent = {
              totalReviw: size,
              totalRating: totalRating
            };
            this.props.ratingAndReviewCount(resParent);
          }
        }
      })
      .catch(err => {});
  }
  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }
  addReviewOpen() {
    this.setState(prevState => ({
      addReviewOpen: !prevState.addReviewOpen
    }));
  }
  handelTextChange(e) {
    const id = e.target.id;
    let type = [];
    let match = null;
    if (e.target.attributes["data-validate"])
      type = e.target.attributes["data-validate"].value;
    if (e.target.attributes["data-match"])
      match = e.target.attributes["data-match"].value;
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.fieldVaidation(id, type, match);
      }
    );
  }

  fieldVaidation(field, type, match) {
    const typeArr = type.split(",");
    if (typeArr.includes("required")) {
      if (!isEmpty(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "can't be empty"
        });
        return;
      }
    }
    if (typeArr.includes("name")) {
      if (isAlpha(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Only Alphabets"
        });
        return;
      }
    }
    if (typeArr.includes("email")) {
      if (isEmail(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Email Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("phone")) {
      if (isMobilePhone(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("zipcode")) {
      // if(isPostalCode(this.state[field])){
      if (isNumeric(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("password")) {
      if (this.state[field].length > 5) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Too Short"
        });
        return;
      }
    }
    if (typeArr.includes("repassword")) {
      if (this.state[field] === match) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: passwordMatchErrMsg
        });
        return;
      }
    }
  }

  handleReviewName(e) {
    this.setState({
      reviewName: e.target.value
    });
  }
  handleReviewContent(e) {
    this.setState({
      reviewContent: e.target.value
    });
  }
  handleReviewTitle(e) {
    this.setState({
      reviewTitle: e.target.value
    });
  }
  submitReview(e) {
    e.preventDefault();

    const { reviewName, reviewContent, reviewTitle } = this.state;

    waterfall([
      done => {
        this.fieldVaidation("reviewName", "required,name");
        this.fieldVaidation("reviewContent", "required");
        this.fieldVaidation("reviewTitle", "required");
        return done();
      },
      done => {
        const {
          reviewName_err,
          reviewContent_err,
          reviewTitle_err
        } = this.state;
        if (!reviewName_err && !reviewContent_err && !reviewTitle_err) {
          this.setState({
            isLoading: true,
            showModal: true
          });
          if (this.state.rating > 0) {
            this.setState({
              StarRatinng_err: true,
              StarRatinng_errMsg: "Rating field are required"
            });
          } else {
            addReview({
              title: reviewTitle,
              userid: this.state.loginUserId,
              productid: this.props.product.productid._id,
              description: reviewContent,
              rating: this.state.StarRating,
              status: "pending",
              nickname: reviewName
            })
              .then(res => res.json())
              .then(resJson => {
                this.setState({
                  isLoading: false
                });
                if (resJson.success) {
                  this.setState({
                    modalData: {
                      title: "",
                      msg: addReviewMessage
                    },
                    isRegister: true
                  });
                  this.addReviewOpen();
                  setTimeout(() => {
                    this.setState({
                      isLoading: false,
                      showModal: false,
                      reviewName: "",
                      reviewContent: "",
                      reviewTitle: ""
                    });
                  }, 5000);
                } else if (resJson.message) {
                  this.setState({
                    modalData: {
                      title: "Error",
                      msg: resJson.message
                    }
                  });
                } else {
                  this.setState({
                    modalData: {
                      title: "Error",
                      msg: "Try again ..."
                    }
                  });
                }
              })
              .catch(err => {
                this.setState({
                  isLoading: false
                });
              });
          }
        }
      }
    ]);
  }
  changeRating(newRating, name) {
    this.setState({
      StarRating: newRating,
      StarRatinng_err: false
    });
  }

  renderReviews() {
    const { reviewsList } = this.state;
    const StarCount = [0, 1, 2, 3, 4];
    if (reviewsList.length > 0) {
      return reviewsList.map((reviewsList, index) => {
        const { nickname, description, title, rating } = reviewsList;
        return (
          <div className="review-container" key={index}>
            <div className="review">
              <div className="review-title-container">
                <p className="review-title">{title}</p>
                <div className="review-icon">
                  {StarCount.map((el, index) => {
                    if (rating > index) {
                      return <Icon key={index} icon={starFull} />;
                    }
                    return <Icon key={index} icon={starEmpty} />;
                  })}
                </div>
              </div>
              <div className="review-content-container">
                <p className="review-content">{description}</p>
                <div className="reviewer-name">
                  <p>{nickname}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <p>No Review.</p>;
    }
  }

  render() {
    const {
      reviewName,
      reviewName_err,
      reviewName_errMsg,
      reviewContent,
      reviewContent_err,
      reviewContent_errMsg,
      reviewTitle,
      reviewTitle_err,
      reviewTitle_errMsg,
      modalData,
      showModal,
      isLoading,
      StarRatinng_errMsg,
      StarRatinng_err
    } = this.state;
    return (
      <div className="review-main-wrapper">
        <button className="btn btn-info btn4" onClick={this.addReviewOpen}>
          Add Reviews
        </button>
        <div className="review-header">
          <h2 className="MCItemCarouselIntro-title">Reviews</h2>
          <StarRatings
            rating={this.state.avgRating}
            starRatedColor="#f2b01e"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
          />
          <h2 className="MCItemCarouselIntro-title review-count">
            {this.state.reviewsList.length} Reviews
          </h2>
        </div>

        <div className="review-container-wrapper">
          <Scrollbars style={{ height: 400 }}>
            {this.renderReviews()}
          </Scrollbars>
        </div>
        <Modal isOpen={this.state.addReviewOpen} toggle={this.addReviewOpen}>
          <div className="review-header">
            <h2 className="MCItemCarouselIntro-title">Add Reviews</h2>
            <a onClick={this.addReviewOpen} href="#/">
              {" "}
              <Icon icon={ic_clear} />
            </a>
          </div>
          {this.state.loginShow ? (
            <div className="review-container-wrapper">
              <div className="review-container">
                <div className="row justify-content-center Regular">
                  <div className="">
                    <div className="review-form">
                      <label>Add Rating</label>
                      <br />
                      <StarRatings
                        rating={this.state.StarRating}
                        starRatedColor="#f2b01e"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                      />

                      {StarRatinng_err && (
                        <p className="error">{StarRatinng_errMsg}</p>
                      )}
                      <br />
                      <br />
                      <form onSubmit={this.submitReview}>
                        <div
                          className={classNames("col-12 has-input", {
                            "has-error": reviewName_err
                          })}
                        >
                          <label htmlFor="reviewName">Nickname</label>
                          <input
                            type="text"
                            id="reviewName"
                            onChange={this.handelTextChange}
                            data-validate={["name", "required"]}
                            value={reviewName}
                          />
                          {reviewName_err && (
                            <p className="error">
                              {reviewName_errMsg &&
                              reviewName_errMsg === "can't be empty"
                                ? "Name is required"
                                : reviewName_errMsg}
                            </p>
                          )}
                        </div>
                        <div
                          className={classNames("col-12 has-input", {
                            "has-error": reviewTitle_err
                          })}
                        >
                          <label htmlFor="reviewTitle">Title</label>
                          <input
                            type="text"
                            id="reviewTitle"
                            onChange={this.handelTextChange}
                            data-validate={["required"]}
                            value={reviewTitle}
                          />
                          {reviewTitle_err && (
                            <p className="error">
                              {reviewTitle_errMsg &&
                              reviewTitle_errMsg === "can't be empty"
                                ? "Title is required"
                                : reviewTitle_errMsg}
                            </p>
                          )}
                        </div>
                        <div
                          className={classNames("col-12 has-input", {
                            "has-error": reviewContent_err
                          })}
                        >
                          <label htmlFor="reviewContent">Content</label>
                          <textarea
                            type="text"
                            id="reviewContent"
                            onChange={this.handelTextChange}
                            value={reviewContent}
                            data-validate={["required"]}
                            className="form-control"
                            style={{
                              height: "100px",
                              marginBottom: "10px"
                            }}
                          >
                            {reviewContent_err && (
                              <p className="error">
                                {reviewContent_errMsg &&
                                reviewContent_errMsg === "can't be empty"
                                  ? "Review is required"
                                  : reviewContent_errMsg}
                              </p>
                            )}
                          </textarea>
                        </div>
                        <div className="has-input has-inline-label has-input-submit ">
                          <div className="col-md-12">
                            <input
                              type="submit"
                              className="btn btn-main btn7"
                              value="Submit"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>{withoutLoginReviewMessage}</p>
          )}
        </Modal>

        <Modal
          isOpen={showModal}
          toggle={this.toggleModal}
          className={"full-modal"}
        >
          <ModalHeader toggle={this.toggleModal}>{modalData.title}</ModalHeader>
          <div className="Modal-body center-modal">
            <div className="modal-inner">
              {isLoading && <div className="loader" />}
              {!isLoading && (
                <div className="modal-content">
                  {/* <p className="text-center MCItemCarouselIntro-title">
                    {modalData.title}
                  </p> */}
                  <p className="text-center title-80 p-3">{modalData.msg}</p>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export const Reviews = connect(mapStateToProps)(ReviewsClass);
