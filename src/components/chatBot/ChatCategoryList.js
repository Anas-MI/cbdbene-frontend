import React, { Component } from "react";
// import ChatBot from "react-simple-chatbot";
import classNames from "classnames";
// import { ThemeProvider } from "styled-components";
// import { connect } from "react-redux";
// import { imagePack, categoryList } from "../Constants";
// import { getAllProductApi } from "../../services/api/getAllProductApi";
// import { getProductsByCategory } from "../../services/extra/productHelpers";

class ChatCategoryList extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      categoryList: []
    };
  }
  render() {
    const { selected, categoryList } = this.state;
    return (
      <div>
        {categoryList.map((el, index) => (
          <p
            className={classNames("chat-custom-option", {
              selected: selected === el
            })}
            onClick={() => {
              if (!selected) {
                this.setState(
                  {
                    categoryList: categoryList.filter(elx => elx === el),
                    selected: el
                  },
                  () => {
                    this.props.triggerNextStep({
                      value: el
                    });
                  }
                );
              }
            }}
            key={index}
          >
            {el}
          </p>
        ))}
      </div>
    );
  }
}

export default ChatCategoryList;
