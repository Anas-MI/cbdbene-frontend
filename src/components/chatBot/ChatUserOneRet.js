import React, { Component } from "react";
import { connect } from "react-redux";
import ChatMsgList from "./ChatMsgList";
import { getOrderByUser } from "../../services/api";

const chatMsgList = new ChatMsgList();
const {
  getWrongTextMsg,
  msgAfterShopSelect,
  msgAfterTrackSelect,
  msgAfterTrackSelectNoOrder,
  msgTrackNow
} = chatMsgList;

class ChatUserOneRet extends Component {
  constructor() {
    super();
    this.state = {
      msg: "..."
    };
  }
  componentDidMount() {
    const { steps, triggerNextStep } = this.props;
    const msg = steps.userOne.message.toLocaleLowerCase();
    if (msg.includes("place")) {
      this.setState(
        {
          msg: msgAfterShopSelect()
        },
        () => {
          triggerNextStep({
            value: "",
            trigger: "categoryList"
          });
        }
      );
    } else if (msg.includes("track")) {
      const { user } = this.props;

      if (user._id) {
        if (user.userMetaId) {
          getOrderByUser(user.userMetaId)
            .then(res => res.json())
            .then(resJson => {
              if (resJson.status) {
                const orderList = resJson.orders.sort(function(a, b) {
                  return new Date(b.createdOn) - new Date(a.createdOn);
                });
                if (orderList.length > 0) {
                  this.setState(
                    {
                      msg: msgAfterTrackSelect()
                    },
                    () => {
                      triggerNextStep({
                        value: "",
                        trigger: "trackNowLogin"
                      });
                    }
                  );
                } else {
                  this.setState(
                    {
                      msg: msgAfterTrackSelectNoOrder()
                    },
                    () => {
                      triggerNextStep({
                        value: "",
                        trigger: "firstOptions"
                      });
                    }
                  );
                }
              }
            })
            .catch(err => {
              this.setState(
                {
                  msg: msgAfterTrackSelect()
                },
                () => {
                  triggerNextStep({
                    value: "",
                    trigger: "trackNowLogin"
                  });
                }
              );
              console.log({ err });
            });
        }
      } else {
        this.setState(
          {
            msg: msgTrackNow()
          },
          () => {
            triggerNextStep({
              value: "",
              trigger: "trackNow"
            });
          }
        );
      }
    } else {
      this.setState(
        {
          msg: getWrongTextMsg()
        },
        () => {
          triggerNextStep({
            value: "",
            trigger: "shopSelected"
          });
        }
      );
    }
  }
  render() {
    return <div>{this.state.msg}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(ChatUserOneRet);
