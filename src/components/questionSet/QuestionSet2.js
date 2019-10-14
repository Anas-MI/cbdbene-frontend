import React, { Component } from "react";
import classNames from "classnames";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Question } from "./";
import FadeTransition from "../FadeTransition";
import ListNavigation from "../ListNavigation";
import { ProductListItem } from "../productListing";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { LeafCheckBox } from "../form";

class QuestionSet2 extends Component {
  constructor(props) {
    super(props);
    this.onAnswer = this.onAnswer.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.state = {
      currentQueIndex: 0,
      answeredQue: props.questions || [],
      queList: props.questions || [],
      currentQue: props.questions ? props.questions[0] : {},
      isVisible: true,
      product: null,
      products: props.products,
      currentSelectedState: null
    };
  }
  returnAnswered(question, answer) {
    return {
      ...question,
      selected: answer
    };
  }
  onAnswerChecked = e => {
    const { value } = e.target;
    this.setState({
      currentSelectedState: value
    });
  };
  onAnswerCheckedMulti = e => {
    const { value } = e.target;
    const { currentSelectedState } = this.state;
    if (currentSelectedState.find(el => el === value)) {
      this.setState(prevState => ({
        currentSelectedState: prevState.currentSelectedState.filter(
          el => el !== value
        )
      }));
    } else
      this.setState(prevState => ({
        currentSelectedState: [...prevState.currentSelectedState, value]
      }));
  };
  getProduct(answer = [], products = this.state.products) {
    const productAns = answer.map(el => el.selected);
    const product = products.find(el => {
      console.log({
        el,
        products,
        currentAn: el.answer,
        productAns
      });
      return el.answer.every((el, i) => el === productAns[i]);
    });
    this.setState({
      product,
      isVisible: true,
      currentQue: {}
    });
    console.log(product);
  }
  getRandomProduct = () => {
    const { products } = this.props;
    const product = products[Math.round(Math.random() * products.length)];
    this.setState({
      product
    });
  };
  setQuestion(index) {
    if (this.state.queList[index]) {
      setTimeout(() => {
        this.setState(
          {
            currentQue: this.state.queList[index]
          },
          () => {
            setTimeout(() => {
              this.setState({ isVisible: true });
            }, 400);
            console.log({ index, cur: this.state.currentQue });
          }
        );
      }, 400);
    } else {
      this.getProduct(this.state.answeredQue);
    }
  }
  isNextMulti = (index, list) => {
    if (list[index]) return list[index].hasMulti ? true : false;

    return false;
  };
  isOptionChecked = (isMulti, value, currentState) => {
    console.log({
      currentState,
      constructor: currentState && currentState.constructor
    });
    if (!currentState) return false;
    if (isMulti && currentState.constructor === Array) {
      const newVal = currentState.find(el => el === value);
      return newVal ? true : false;
    }
    return currentState === value;
  };
  setCurrentSelected = (index, list, selected) => {
    if (selected[index].selected) {
      return selected[index].selected;
    }
    return this.isNextMulti(index, list) ? [] : null;
  };
  onFinish = () => {
    this.setState(
      {
        isVisible: false
      },
      () => {
        setTimeout(() => {
          this.setState({
            isVisible: true
          });
          this.getRandomProduct();
        }, 400);
      }
    );
  };
  onAnswer() {
    const {
      currentQueIndex,
      queList,
      currentSelectedState,
      answeredQue
    } = this.state;
    // const newItem = this.returnAnswered(queList[currentQueIndex], currentSelectedState);
    const answeredQueNew = answeredQue.map((el, index) => {
      if (index !== currentQueIndex) {
        return el;
      }
      return this.returnAnswered(el, currentSelectedState);
    });
    this.setState(
      prevState => ({
        answeredQue: answeredQueNew,
        currentQueIndex: prevState.currentQueIndex + 1,
        isVisible: false,
        currentSelectedState: this.setCurrentSelected(
          prevState.currentQueIndex + 1,
          queList,
          answeredQue
        )
        //this.isNextMulti(prevState.currentQueIndex + 1, queList) ? [] : null
      }),
      () => {
        this.setQuestion(this.state.currentQueIndex);
      }
    );
  }
  goBack = () => {
    const { queList, answeredQue } = this.state;

    this.setState(
      prevState => ({
        currentSelectedState: this.setCurrentSelected(
          prevState.currentQueIndex - 1,
          queList,
          answeredQue
        ),
        currentQueIndex: prevState.currentQueIndex - 1,
        isVisible: false
      }),
      () => {
        this.setQuestion(this.state.currentQueIndex);
      }
    );
  };
  isDisable = selected => {
    if (selected) {
      if (selected.constructor === Array) {
        if (selected.length === 0) {
          return true;
        }
      }
      return false;
    }
    return true;
  };
  render() {
    const {
      currentQue,
      isVisible,
      product,
      queList,
      currentQueIndex,
      currentSelectedState
    } = this.state;
    const { countryCode } = this.props;
    console.log({
      product
    });
    return (
      <div className="question-set-full-wrap">
        {!product && (
          <div className="pt-5">
            <Question title="Take our CBD quiz, so we can find what fits your needs." />
            <ListNavigation list={queList.length} current={currentQueIndex} />
          </div>
        )}
        <FadeTransition in={isVisible}>
          <div className="question-set-container">
            {product && (
              <div>
                <h3 className="mb-2 text-center">Ta-Da!</h3>
                <Question
                  className="mb-5"
                  title={" Based on your answers, this is what we recommend."}
                />
                <ProductListItem
                  className={"ml-auto mr-auto"}
                  image={
                    product.productid
                      ? product.productid.featurefilepath
                      : product.featureimage
                  }
                  title={
                    product.productid
                      ? product.productid.producttitle
                      : product.title
                  }
                  product={product}
                  fixWidth={true}
                  description={
                    product.productid
                      ? product.productid.sdescription
                      : product.sdescription
                  }
                  link={`/${countryCode}/shop/${product.productSlug}`}
                  btnText={"View"}
                  history={this.props.history}
                  btnTextAlter={"View"}
                  linkText={"Learn More"}
                />
                <ProductListItem
                  className={"ml-auto mr-auto"}
                  image={
                    product.productid
                      ? product.productid.featurefilepath
                      : product.featureimage
                  }
                  title={
                    product.productid
                      ? product.productid.producttitle
                      : product.title
                  }
                  product={product}
                  fixWidth={true}
                  description={
                    product.productid
                      ? product.productid.sdescription
                      : product.sdescription
                  }
                  link={`/${countryCode}/shop/${product.productSlug}`}
                  btnText={"View"}
                  history={this.props.history}
                  btnTextAlter={"View"}
                  linkText={"Learn More"}
                />
              </div>
            )}

            {currentQue.question && !product && (
              <Question title={currentQue.question}>
                {currentQue.hasMulti && (
                  <p className="MCLeftCopy-eyebrow text-center">
                    You can choose two if you'd like.
                  </p>
                )}
              </Question>
            )}
            <div className="question-set-answer-container row justify-content-center">
              {currentQue.answers &&
                !product &&
                currentQue.answers.map((el, key) => (
                  <LeafCheckBox
                    key={key}
                    label={el.key}
                    checked={this.isOptionChecked(
                      currentQue.hasMulti,
                      el.value,
                      this.state.currentSelectedState
                    )}
                    onChange={e => {
                      if (currentQue.hasMulti) this.onAnswerCheckedMulti(e);
                      else this.onAnswerChecked(e);
                    }}
                    value={el.value}
                    className={classNames("question-set-answer")}
                  />
                ))}
            </div>
          </div>
        </FadeTransition>
        <div className="question-set-answer-container row justify-content-center">
          {currentQueIndex !== 0 && !product && (
            <div className={"question-set-answer"}>
              <button onClick={this.goBack} className="btnAs has-hover">
                Previous
              </button>
            </div>
          )}
          {currentQueIndex !== queList.length - 1 && !product && (
            <div className={"question-set-answer"}>
              <button
                disabled={this.isDisable(currentSelectedState)}
                onClick={this.onAnswer}
                className="btnAs has-hover"
              >
                Next
              </button>
            </div>
          )}
          {currentQueIndex === queList.length - 1 && !product && (
            <div className={"question-set-answer"}>
              <button
                disabled={this.isDisable(currentSelectedState)}
                onClick={this.onFinish}
                className="btnAs has-hover"
              >
                Finish
              </button>
            </div>
          )}
          {/* {product && (
            <div className="question-set-answer-container row justify-content-center">
              <Link
                to={`/${this.props.countryCode}/shop/${product.productSlug}`}
                className="btnAs has-hover text-center"
              >
                Buy Now
              </Link>
            </div>
          )} */}
          {/* {currentQueIndex !== 0 && 
          <div className={"question-set-answer"}>
            <button
              onClick={this.goBack}
              className="btnAs has-hover"
            >
              Previous
            </button>
          </div>}
          <div className={"question-set-answer"}>
            <button
              onClick={this.onAnswer}
              className="btnAs has-hover"
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  countryCode: state.location.countryCode,
  products: state.products.products
});
export default connect(mapStateToProps)(QuestionSet2);
