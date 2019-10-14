import React, { Component } from "react";
import classNames from "classnames";
import { trackPlaceHolder, trackLabel } from "../../constantMessage";
import { imagePack } from "../Constants";
import { CustomLink } from "..";
import { connect } from "react-redux";
import { getTrackingUrl } from "../../services/api";

class OrderTracking extends Component {
  constructor(){
    super()
    this.state = {
      trackingId : "",
      trackingIdErr : null,
      trackingIdErrMsg : "Tracking Id is required.",
    }
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  onChange = e => {
    this.setState({
      trackingId: e.target.value
    }, ()=> {
      const {
        trackingId
      } = this.state
      if(trackingId && trackingId.length > 0 ){
        this.setState({
          trackingIdErr: false,
          trackingIdErrMsg: ""
        })
      }else{
        this.setState({
          trackingIdErr: true,
          trackingIdErrMsg: "Tracking Id is required."
        })
      }
    })
  }
  onSubmit = e => {
    e.preventDefault()
    const {
      trackingId
    } = this.state
    if(trackingId && trackingId.length > 0 ){
      getTrackingUrl(trackingId).then(res => res.json())
      .then(res => {
        console.log({
          res
        })
        if(res && res.data && res.data.public_url){
          this.setState({
            trackingIdErr: null,
            trackingIdErrMsg: "",
            trackingId: "",
          }, ()=> {

          })
          window.open(res.data.public_url)
        }else{
          this.setState({
            trackingIdErr: true,
            trackingIdErrMsg: "Tracking Id is invalid."
          })
        }
      }).catch(err => {
        console.log({
          err
        })
        this.setState({
          trackingIdErr: true,
          trackingIdErrMsg: "Tracking Id is invalid."
        })
      })
    }else{
      this.setState({
        trackingIdErr: true,
        trackingIdErrMsg: "Tracking Id is required."
      })
    }
  }
  render() {
    const { className } = this.props;
    const { trackingId, trackingIdErr, trackingIdErrMsg } = this.state;
    const logo = (
      <CustomLink to={`/${this.props.location.countryCode}`}>
        <img
          src={imagePack.logo}
          className="img-fluid d-block mb-2 ml-auto mr-auto"
          alt="cbdbené"
        />
      </CustomLink>
    );
    return (
      <div
        className={classNames("w-100", {
          [className]: className
        })}
      >
        <div className="track-page-wrapper">
          <div className="track-inner w-100">
            <div className="track-from pb-md-5 mx-auto">
              {logo}
              <p className="pb-5 text-center w-100">{trackLabel}</p>
              <form onSubmit={this.onSubmit}>
                <div className="track-input mb-5 pb-lg-5">
                  <input
                    type="text"
                    placeholder={trackPlaceHolder}
                    name="trackingId"
                    className={classNames({
                      "error": trackingIdErr
                    })}
                    value={trackingId}
                    id="trackingId "
                    onChange={this.onChange}
                  />
                  {trackingIdErr && <p className="error">
                    {trackingIdErrMsg}
                  </p>}
                  <div className="text-center w100">
                    <input
                      className="Link Link--isBtn d-inline-block w-auto cursor-pointer mt-3"
                      type="submit"
                      value="Track"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  location: state.location
});
export default connect(mapStateToProps)(OrderTracking);
