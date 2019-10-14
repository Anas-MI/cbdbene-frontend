import React from "react";
import classNames from "classnames";

export default ({
  className,
  type,
  image,
  userImage,
  title,
  description,
  theme,
  author,
  full
}) => (
  <div
    className={classNames("full-slide", {
      "image-slide": type === "image",
      "autoh-full-slide": !full,
      [theme]: theme,
      "has-user-image": userImage,
      [className]: className
    })}
  >
    <div className="full-slide-inner">
      {userImage && (
        <div className="full-slide-user-image">
          <img src={userImage} alt={author} />
        </div>
      )}
      <div className="full-slide-content">
        {image && <img src={image} alt={image} />}
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        {author && <h5 className="author">{author}</h5>}
      </div>
    </div>
  </div>
);
