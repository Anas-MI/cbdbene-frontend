import React from "react";
import classNames from "classnames";

export default ({
  type,
  image,
  title,
  description,
  theme,
  subTitle,
  full,
  btnText,
  onBtnClick
}) => (
  <div
    className={classNames("full-slide cover", {
      "image-slide": type === "image",
      "autoh-full-slide": !full,
      [theme]: theme
    })}
  >
    <div className="full-slide-inner">
      {image && <img src={image} alt={image} />}
      {title && <h3 className="cover-title">{title}</h3>}
      {subTitle && <h5 className="cover-subtitle">{subTitle}</h5>}
      {description && <p className="cover-description">{description}</p>}
      {btnText && (
        <div className="cover-btn-wrap">
          <span
            onClick={() => {
              if (typeof onBtnClick === "function") onBtnClick();
            }}
            className="Link Link--isBtn cursor-pointer text-center align-items-center justify-content-center"
          >
            {btnText}
          </span>
        </div>
      )}
    </div>
  </div>
);
