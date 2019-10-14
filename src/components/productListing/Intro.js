import React from "react";
import classNames from "classnames";
import CustomLink from "../CustomLink";
import IntroBtn from "./IntroBtn";

export default ({
  link,
  title,
  className,
  description,
  onBtnClick,
  btnLink,
  btnText,
  ...props
}) => {
  return (
    <div
      className={classNames("CPSubcatIntro CPBodyRow-intro ", {
        [className]: className
      })}
      {...props}
    >
      <div className="CPSubcatIntroDescription">
        <CustomLink
          className="CPSubcatIntroDescription-btn"
          to={link ? link : "#"}
        >
          <h2 className="CPSubcatIntroDescription-name">{title}</h2>
        </CustomLink>
        {description &&
          description.map((el, ind) => (
            <p key={ind} className="CPSubcatIntroDescription-info">
              {el}
            </p>
          ))}
        {btnText && (
          <IntroBtn link={btnLink} onClick={onBtnClick}>
            {btnText}
          </IntroBtn>
        )}
      </div>
    </div>
  );
};
