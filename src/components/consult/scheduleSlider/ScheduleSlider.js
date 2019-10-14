import React, { Component } from "react";
import Flickity from "react-flickity-component";
import classNames from "classnames";
import { flickityOptions } from "../../Constants";
import Icon from "react-icons-kit";
import { ic_chevron_left, ic_chevron_right } from "react-icons-kit/md/";
import { Card, CardBody, Button, ButtonGroup, CardFooter } from "reactstrap";

const ScheduleSlide = ({
  heading,
  time,
  onBtnClick,
  className,
  doctorName
}) => {
  return (
    <div
      className={classNames("col-4 pl-1 pr-1", {
        [className]: className
      })}
    >
      <div>
        <div className="text-center">
          <p>{heading && heading.day}</p>
          <p>
            <b>{heading && heading.data}</b>
          </p>
        </div>
        {time &&
          time.map((el, index) => (
            <Button
              color="info "
              key={index}
              onClick={() => {
                if (typeof onBtnClick === "function")
                  onBtnClick({
                    date: heading,
                    time: el,
                    doctorName
                  });
              }}
              className="btn-xs mx-auto w-100 mb-1 mt-1"
            >
              {el}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default class ScheduleSlider extends Component {
  constructor() {
    super();
    this.state = {
      activeNumber: 0,
      list: 0,
      visible: 3
    };
  }
  onNext = () => {
    const { activeNumber, list } = this.state;
    if (list > activeNumber + 2) {
      this.setState(prevState => ({
        activeNumber: prevState.activeNumber + 1
      }));
    }
  };
  onPrev = () => {
    const { activeNumber } = this.state;
    if (0 < activeNumber) {
      this.setState(prevState => ({
        activeNumber: prevState.activeNumber - 1
      }));
    }
  };
  onBtnClick = el => {
    const { onBtnClick } = this.props;
    if (typeof onBtnClick === "function") {
      onBtnClick(el);
    }
  };
  render() {
    const { times, doctorName } = this.props;
    const { activeNumber, list } = this.state;
    if (list !== ((times && times.length) || 0)) {
      this.setState({
        list: (times && times.length) || 0
      });
    }

    return (
      <div className="schedule-slider w-100">
        <div
          onClick={this.onPrev}
          className="schedule-slider__arrow schedule-slider-arrow--left cursor-pointer"
        >
          <Icon icon={ic_chevron_left} />
        </div>
        <div className="schedule-slider__container">
          <div className="w-100 pl-1 pr-1">
            <div className="row ml-n1 mr-n1">
              {times &&
                times.map((el, index) => {
                  return (
                    <ScheduleSlide
                      className={classNames({
                        "d-none": !(
                          index === activeNumber ||
                          index === activeNumber + 1 ||
                          index === activeNumber + 2
                        )
                      })}
                      heading={el.date}
                      time={el.time}
                      onBtnClick={this.onBtnClick}
                      doctorName={doctorName}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div
          onClick={this.onNext}
          className="schedule-slider__arrow schedule-slider-arrow--right cursor-pointer"
        >
          <Icon icon={ic_chevron_right} />
        </div>
      </div>
    );
  }
}
