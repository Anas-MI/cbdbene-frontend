import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import ScheduleSlider from "./scheduleSlider/ScheduleSlider";
import { starFull, starEmpty, starHalf } from "react-icons-kit/icomoon/";
import { Card, CardBody, Button, ButtonGroup, CardFooter } from "reactstrap";

const Stars = ({ rating }) => {
  const StarCount = [0, 1, 2, 3, 4];
  return StarCount.map((el, index) => {
    if (rating >= index + 1) {
      return <Icon key={index} icon={starFull} />;
    } else {
      if (rating > parseFloat(index + 0.4)) {
        return <Icon key={index} icon={starHalf} />;
      } else {
        return <Icon key={index} icon={starEmpty} />;
      }
    }
  });
};
class SingleDrCart extends Component {
  constructor() {
    super();
    this.props = {
      time: null
    };
  }

  setTime = el => {
    const { history, location } = this.props;
    const pathname = `/${location.countryCode}/book-appointment`;
    console.log(el);
    // history.push(pathname)
    history.push({
      pathname,
      state: { appointmentDetail: el }
    });
  };
  render() {
    const { fixedWidth, full, doctor, times } = this.props;

    return (
      <div
        className={classNames(
          "p-2 align-content-center justify-content-center",
          {
            "w-25": !fixedWidth && !full,
            "fixed-width": fixedWidth,
            "w-100": full
          }
        )}
      >
        <Card className="doctor-card card-border cartImage">
          <center>
            <img
              alt="doctor"
              src={
                (doctor && doctor.image) ||
                "https://pbs.twimg.com/profile_images/864104988146114560/MSWTWwno.jpg"
              }
              className=" rounded-circle  "
              width="210px"
            />
          </center>
          <CardBody>
            <h5 className="text-center">{doctor && doctor.name}</h5>
            <p className="text-center">{doctor && doctor.designation}</p>
            {/* <p className="text-center">{doctor && doctor.address}</p> */}
            <div className="rating-icon text-center">
              {doctor && doctor.stars && <Stars rating={doctor.stars} />}
            </div>
            {doctor && doctor.reviews && (
              <p className="pt-2 text-center">{doctor.reviews} reviews</p>
            )}
            <hr />
            <center>
              <ScheduleSlider
                doctorName={doctor && doctor.name}
                onBtnClick={this.setTime}
                times={times}
              />
            </center>
          </CardBody>
          <CardFooter>
            {/* <Link
              to={`/${this.props.location.countryCode}/book-appointment`}
              className="btn3 w-100"
            >
              Book Appointment
            </Link> */}
            <p
              style={{
                lineHeight: "1.5",
                paddingTop: "10px"
              }}
              className="text-center"
            >
              {doctor && doctor.address}
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps)(SingleDrCart);
