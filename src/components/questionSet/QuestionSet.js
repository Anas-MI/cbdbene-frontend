import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Question } from "./";
import FadeTransition from "../FadeTransition";

class QuestionSet extends Component {
  constructor(props) {
    super(props);
    this.onAnswer = this.onAnswer.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.state = {
      currentQueIndex: 0,
      answeredQue: [],
      queList: props.questions || [],
      currentQue: props.questions ? props.questions[0] : {},
      isVisible: true,
      product: null,
      products: props.products
    };
  }
  returnAnswered(question, answer) {
    return {
      ...question,
      selected: answer
    };
  }
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
  onAnswer(question, answer) {
    const newItem = this.returnAnswered(question, answer);
    this.setState(
      prevState => ({
        answeredQue: [...prevState.answeredQue, newItem],
        currentQueIndex: prevState.currentQueIndex + 1,
        isVisible: false
      }),
      () => {
        this.setQuestion(this.state.currentQueIndex);
      }
    );
  }
  render() {
    const { currentQue, isVisible, product } = this.state;
    return (
      <FadeTransition in={isVisible}>
        <div className="question-set-container">
          {product && (
            <div>
              <p className="MCLeftCopy-eyebrow text-center">We recommend you</p>
              <Question title={product.title} />
              <div className="question-set-answer-container row justify-content-center">
                <Link
                  to={`/${this.props.countryCode}/shop/${product.productSlug}`}
                  className="btnAs has-hover text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          )}

          {currentQue.question && <Question title={currentQue.question} />}
          <div className="question-set-answer-container row justify-content-center">
            {currentQue.answers &&
              currentQue.answers.map((el, key) => (
                <div key={key} className={classNames("question-set-answer")}>
                  <button
                    onClick={e => {
                      this.onAnswer(currentQue, el.value);
                    }}
                    value={el.value}
                    className="btnAs has-hover"
                  >
                    {el.key}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </FadeTransition>
    );
  }
}
const mapStateToProps = state => ({
  countryCode: state.location.countryCode
});
export default connect(mapStateToProps)(QuestionSet);
