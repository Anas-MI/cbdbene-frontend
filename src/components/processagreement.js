import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from "../actions";
//import {paypalprocessagreement,addPlanTocutomer} from "../services/api";
import { Lodar } from "./";
class Processagreement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getParameter: "",
      Message: "Checking Response",
      SpinnerToggle: true,
      count: 0
    };
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    // this.saveData();
  }

  saveData() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    // var paymentId = url.searchParams.get("paymentId");
    const token = url.searchParams.get("token");
    //var PayerID = url.searchParams.get("PayerID");
    if (token) {
      const paymentSuccessDetails = {
        token
      };

      var allRecord = [];
      //  var allRecordInsert=[];
      if (localStorage.getItem("paypalSubscriptionSuccesss")) {
        allRecord = JSON.parse(
          localStorage.getItem("paypalSubscriptionSuccesss")
        );
        const allRecords = JSON.parse(
          localStorage.getItem("paypalSubscriptionSuccesss")
        );
        if (!allRecords.some(el => el.token === token)) {
          this.props.clearCart(this.props.user.userMetaId);
          localStorage.setItem(
            "paypalSubscriptionSuccesss",
            JSON.stringify([...allRecords, paymentSuccessDetails])
          );
        }
      } else {
        allRecord.push(paymentSuccessDetails);
        this.props.clearCart(this.props.user.userMetaId);
        localStorage.setItem(
          "paypalSubscriptionSuccesss",
          JSON.stringify(allRecord)
        );
      }
      // var count=0
      // if(count===0 && this.state.count ===0){
      //   this.setState({
      //     count:1
      //   })
      //   count = count+1;
      //   paypalprocessagreement({token})
      //   .then(res => {
      //     return res.json();
      //    })
      //   .then(resJson => {
      //    })

      //   .catch(err => {
      //     console.log("paypal erro", err);
      //   });
      //   const data = {
      //     plan:token,
      //     userid: userid,
      //     customer:userid,
      //   };
      //   addPlanTocutomer(data)
      //     .then(res => res.json())
      //     .then(resJson => {
      //       setTimeout(()=>{
      //         //window.close();
      //       },3000)
      //     });
      // }
      window.close();
    } else {
      localStorage.setItem("paypalSubscriptionFail", true);
      // window.close();
    }
  }

  render() {
    this.saveData();
    return <div>{this.state.SpinnerToggle && <Lodar />}</div>;
  }
}
const mapStateToProps = state => {
  // console.log(state, "from che")
  return state;
};
export default connect(
  mapStateToProps,
  { clearCart }
)(Processagreement);
