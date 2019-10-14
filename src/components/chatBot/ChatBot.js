import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";

import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { imagePack, fonts } from "../Constants";

import ChatProductList from "./ChatProductList";
import ChatCategoryList from "./ChatCategoryList";
import ChatProductCard from "./ChatProductCard";
import ChatUserOneRet from "./ChatUserOneRet";
import ChatMsgList from "./ChatMsgList";
import ChatOrderList from "./ChatOrderList";
import LearnResponse from "./LearnResponse";
import { isEmpty, isEmail } from "validator";

const chatMsgList = new ChatMsgList();
const {
  getInitialMsg,
  getInitialMsg2,
  shopNowMsg,
  redirectForTracking,
  emptyTrackingIdErr,
  getProductChooseMsg,
  getMsgAfterCategory,
  contactFirst,
  contactSecond,
  contactThird,
  contactFourth,
  repeatMsg,
  afterProduct,
  contactErrMsgOne,
  contactErrMsgTwo,
  checkoutRedirectMsg,
  checkoutNoItemMsg,
  getProductListMsg,
  pickProductMsg,
  afterProductFinish,
  checkoutFinish,
  learnMoreUserPre,
  learnMoreQuit,
  learnMoreNext,
} = chatMsgList;

class ChatBotElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.user.email,
      opened: false,
      clear: false
    };
  }
  componentDidMount() {
    this.ifLogin();
  }
  toggleFloating = () => {
    this.setState(prevState => ({
      opened: !prevState.opened
    }));
  };
  clearChat = () => {
    this.setState(
      {
        clear: true
      },
      () => {
        this.setState({
          clear: false
        });
      }
    );
  };
  ifLogin = (login, notLogin = null) => {
    if (this.props)
      if (this.props.user) {
        if (this.props.user._id && this.props.user.username) return login;
      }
    return notLogin;
  };
  render() {
    const theme = {
      background: "#f6f3eb",
      fontFamily: fonts.mainfont,
      headerBgColor: "#202020",
      headerFontColor: "#eee9e3",
      headerFontSize: "15px",
      botBubbleColor: "#eee9e3",
      botFontColor: "#202020",
      userBubbleColor: "#fff",
      userFontColor: "#4a4a4a"
    };
    const { isOpen, items } = this.props;
    const { opened, clear } = this.state;
    const chat = [
      this.ifLogin({
        id: "initialOne",
        message: () => {
          const userName =
            this.props.user && this.props.user.username.split(" ")[0];
          return getInitialMsg(userName);
        },
        trigger: "initialTwo"
      }),
      {
        id: "initialTwo",
        message: getInitialMsg2(),
        trigger: "firstOptionsFresh"
      },
      {
        id: "firstOptionsFresh",
        options: [
          { value: "initialOne", label: "Shop Now", trigger: "shopSelected" },
          { value: "checkout", label: "Checkout", trigger: "checkout" },
          { value: "contact", label: "Contact us", trigger: "contact" },
          { value: "learnMore", label: "Learn more", trigger: "learnMoreUserPre" },
        ]
      },
      {
        id: "firstOptions",
        options: [
          { value: "initialOne", label: "Shop Now", trigger: "shopSelected" },
          { value: "checkout", label: "Checkout", trigger: "checkout" },
          { value: "contact", label: "Contact us", trigger: "contact" },
          { value: "learnMore", label: "Learn more", trigger: "learnMoreUserPre" },
        ]
      },
      {
        id: "learnMoreUserPre",
        message: learnMoreUserPre(),
        trigger: "learnMoreUser"
      },
      {
        id: "learnMoreUser",
        user: true,
        trigger: "learnMoreResponce"
      },
      {
        id: "learnMoreResponce",
        component: <LearnResponse />,
        waitAction: true,
        asMessage: true,
      },
      {
        id: "learnMoreQuit",
        message: learnMoreQuit(),
        trigger: "learnMoreQuitAfter"
      },
      {
        id: "learnMoreQuitAfter",
        user: true,
        trigger: ({value})=> {
          if(value.toLowerCase().trim() === 'yes')
          return "firstOptions"

          return "learnMoreNext"
        }
        // trigger: "learnMoreResponce"
      },
      {
        id: "learnMoreNext",
        message: learnMoreNext(),
        trigger: "learnMoreUser"
      },
      {
        id: "shopSelected",
        message: shopNowMsg(),
        trigger: "userOne"
      },
      {
        id: "userOne",
        user: true,
        // waitAction: true,
        trigger: "5"
      },
      {
        id: 5,
        component: <ChatUserOneRet />,
        waitAction: true,
        asMessage: true
      },
      // {
      //   id: "trackNow",
      //   message: msgTrackNow(),
      //   trigger: "getTrackingId"
      // },
      {
        id: "trackNowLogin",
        // message: msgTrackNow(),
        component: <ChatOrderList />,
        trigger: "trackNowLoginNext",
        waitAction: true
      },
      {
        id: "trackNowLoginNext",
        message: pp => {
          setTimeout(() => {
            window.open("https://www.google.com");
          }, 2000);
          return redirectForTracking();
        },
        trigger: "repeat"
      },
      {
        id: "trackNow",
        user: true,
        validator: value => {
          if (isEmpty(value)) {
            return emptyTrackingIdErr();
          }
          return true;
        },
        trigger: props => {
          console.log({
            props
          });
          return "repeat";
        }
      },
      {
        id: "categoryList",
        component: <ChatCategoryList />,
        waitAction: true,
        // asMessage: true,
        trigger: "postCategory"
      },
      {
        id: "postCategory",
        message: ({ previousValue }) => {
          return getMsgAfterCategory(previousValue);
        },
        trigger: "preProduct"
      },
      {
        id: "preProduct",
        message: getProductListMsg(),
        trigger: "preProduct2"
      },
      {
        id: "preProduct2",
        message: pickProductMsg(),
        trigger: "products"
      },
      {
        id: "products",
        component: <ChatProductList />,
        waitAction: true,
        trigger: "productSelected1"
        // end: true
      },
      {
        id: "productSelected1",
        message: "Awesome! 😍",
        trigger: props => {
          console.log({ props11: props });
          return "productSelected2";
        }
      },
      {
        id: "productSelected2",
        message: ({ steps }) => {
          return getProductChooseMsg(steps.products.value.productTitle);
          // return `${steps.products.value.productTitle} is my favourite`
        },
        // end: true
        trigger: "afterProduct"
      },
      {
        id: "afterProduct",
        message: afterProduct(),
        trigger: "singleProduct"
      },
      {
        id: "singleProduct",
        component: <ChatProductCard />,
        trigger: "productNext"
      },
      {
        id: "productNext",
        message: afterProductFinish(),
        trigger: "firstOptions"
      },
      {
        id: "checkout",
        message: () => {
          if (items && items.length > 0) {
            return checkoutRedirectMsg();
          }
          return checkoutNoItemMsg();
        },
        trigger: () => {
          if (items && items.length > 0) {
            return "checkout1";
          }
          return "repeat";
        }
      },
      {
        id: "checkout1",
        message: checkoutFinish(),
        trigger: "checkout2"
      },
      {
        id: "checkout2",
        message: () => {
          const { history, countryCode } = this.props;
          setTimeout(() => {
            history.push(`/${countryCode}/checkout`);
            this.toggleFloating();
            this.clearChat();
          }, 400);
          return "";
        },
        end: true
      },
      {
        id: "contact",
        message: contactFirst(),
        trigger: "contactUserFirst"
      },
      {
        id: "contactUserFirst",
        user: true,
        // waitAction: true,
        trigger: ({ value }) => {
          if (isEmail(value)) return "contactTwo";
          else {
            return "contactUserErr";
          }
        }
      },
      {
        id: "contactUserErr",
        message: contactErrMsgOne(),
        trigger: "contactUserErr2"
      },
      {
        id: "contactUserErr2",
        message: contactErrMsgTwo(),
        trigger: "contactUserFirst"
      },
      {
        id: "contactTwo",
        message: contactSecond(),
        trigger: "contactUserSecond"
      },
      {
        id: "contactUserSecond",
        user: true,
        // waitAction: true,
        trigger: "contactThree"
      },
      {
        id: "contactThree",
        message: contactThird(),
        trigger: "contactFourth"
      },
      {
        id: "contactFourth",
        message: contactFourth(),
        trigger: "repeat"
      },
      {
        id: "repeat",
        message: repeatMsg(),
        trigger: "firstOptions"
      }
    ].filter(el => el);

    if (clear) return <div />;

    return (
      <div className="react-chat-bot">
        <div className="chat-inner">
          <ThemeProvider theme={theme}>
            <ChatBot
              opened={opened}
              toggleFloating={this.toggleFloating}
              floatingStyle={{
                bottom: "42px"
              }}
              enableMobileAutoFocus={true}
              floating={true}
              botAvatar={imagePack.beneLeafThumb}
              bubbleStyle={{
                borderRadius: 0,
                marginBottom: 0,
                marginTop: "10px",
                maxWidth: "70%"
              }}
              bubbleOptionStyle={{
                borderRadius: 0,
                marginBottom: 0,
                marginTop: "10px"
              }}
              style={{
                borderRadius: 0,
                bottom: 0,
                right: isOpen ? "380px" : "32px",
                transition: "all 0.4s ease 0s"
              }}
              customStyle={{
                background: "none",
                boxShadow: "none",
                justifyContent: "left",
                marginLeft: "46px"
              }}
              steps={chat}
            />
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isOpen: state.cartSideBar.isOpen,
  countryCode: state.location.countryCode,
  items: state.cart.items
});
export default connect(mapStateToProps)(ChatBotElement);
