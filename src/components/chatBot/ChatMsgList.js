import { getRandomFromArr } from "../Constants";
import { Component } from "react";

export default class ChatMsgList extends Component {
  getWrongTextMsg = () => {
    const msgStr = [
      "I didn't get it 😌",
      "Can you say that a different way?",
      "Lets try one more time, i'm good with short phrases and questions.",
      "Hmmm...Can't understand you. Can we try again?",
      "Sorry, i didn't get that"
    ];
    return getRandomFromArr(msgStr);
  };
  getInitialMsg = (name = "user") => {
    const msg = [
      `Hi ${name}, i am Bené's Bot!`,
      `Ah yes, Welcome ${name}.`,
      `Soo.. Tell me, how are you doing this morning?`
    ];
    return getRandomFromArr(msg);
  };
  getInitialMsg2 = () => {
    const msgStr = [
      "Thanks so much for reaching out! What brings you to Bené today?",
      "Hi there, how can we help you today?",
      "How may i help you?"
    ];
    return getRandomFromArr(msgStr);
  };
  shopNowMsg = () => {
    const msgStr = ["Would you like to place an order or track an order?"];
    return getRandomFromArr(msgStr);
  };
  msgAfterShopSelect = () => {
    const msgStr = ["Choose a category."];
    return getRandomFromArr(msgStr);
  };
  msgAfterTrackSelect = () => {
    const msgStr = ["Select an order"];
    return getRandomFromArr(msgStr);
  };
  msgAfterTrackSelectNoOrder = () => {
    const msgStr = ["Opps! You don't have any order"];
    return getRandomFromArr(msgStr);
  };
  msgTrackNow = () => {
    const msgStr = ["Please enter your Tracking Id"];
    return getRandomFromArr(msgStr);
  };
  emptyTrackingIdErr = () => {
    const msgStr = ["You must enter Tracking Id"];
    return getRandomFromArr(msgStr);
  };
  redirectForTracking = () => {
    const msgStr = ["we will redirect you for tracking"];
    return getRandomFromArr(msgStr);
  };
  getMsgAfterCategory = (name = "category") => {
    const msg = [`Ooh ${name}`, `I like 'em ${name} too`, `So Crazy 😏`];
    return getRandomFromArr(msg);
  };
  repeatMsg = () => {
    const msgStr = ["How else may i help you?"];
    return getRandomFromArr(msgStr);
  };

  getProductChooseMsg = name => {
    const msgStr = [
      `Great Choice!`,
      `${name} is my favorite`,
      `I like your choice`,
      `I love this! 🤗`,
      `Sweet!`,
      `You look like a great fit for this product, our spidey sense told us 😎`
    ];
    return getRandomFromArr(msgStr);
  };
  contactFirst = () => {
    const msgStr = ["May i know your email address?"];
    return getRandomFromArr(msgStr);
  };
  contactSecond = () => {
    const msgStr = ["Please tell us your concern"];
    return getRandomFromArr(msgStr);
  };
  contactThird = () => {
    const msgStr = ["Thank you for reaching out to us"];
    return getRandomFromArr(msgStr);
  };
  contactFourth = () => {
    const msgStr = ["We will get back to you ASAP"];
    return getRandomFromArr(msgStr);
  };
  contactErrMsgOne = () => {
    const msgStr = ["Oops..I guess this email is not valid"];
    return getRandomFromArr(msgStr);
  };
  contactErrMsgTwo = () => {
    const msgStr = ["Can you try again ?"];
    return getRandomFromArr(msgStr);
  };
  afterProduct = () => {
    const msgStr = ["Hold on", "Boom", "Cool, let me fetch it...", "Tadah!"];
    return getRandomFromArr(msgStr);
  };
  afterProductFinish = () => {
    const msgStr = ["Is there something else you are interested in?"];
    return getRandomFromArr(msgStr);
  };
  checkoutRedirectMsg = () => {
    const msgStr = ["Lemme redirect you to the checkout page"];
    return getRandomFromArr(msgStr);
  };
  checkoutNoItemMsg = () => {
    const msgStr = ["Sorry no items in cart"];
    return getRandomFromArr(msgStr);
  };
  checkoutFinish = () => {
    const msgStr = ["we'll see you soon"];
    return getRandomFromArr(msgStr);
  };
  getProductListMsg = () => {
    const msgStr = ["Here is a list of products you can choose from.."];
    return getRandomFromArr(msgStr);
  };
  pickProductMsg = () => {
    const msgStr = ["Pick one of these 👇"];
    return getRandomFromArr(msgStr);
  };
  noOrdersMsg = () => {
    const msgStr = ["You haven't ordered anything from us"];
    return getRandomFromArr(msgStr);
  };
  learnMoreUserPre = () => {
    const msgStr = ["Tell me your concern."];
    return getRandomFromArr(msgStr);
  };
  learnMoreNotMatch = () => {
    const msgStr = ["I'm not getting you. Please rephrase that."];
    return getRandomFromArr(msgStr);
  };
  learnMoreQuit = () => {
    const msgStr = ["Do you want to quit?"];
    return getRandomFromArr(msgStr);
  };
  learnMoreNext = () => {
    const msgStr = ["Any more doubts?"];
    return getRandomFromArr(msgStr);
  };
}
