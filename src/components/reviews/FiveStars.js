import React from "react";

import { Icon } from "react-icons-kit";
import { starFull, starEmpty } from "react-icons-kit/icomoon/";

export default props => {
  const { rating = 5, size = 16 } = props;
  const StarCount = [0, 1, 2, 3, 4];
  const onClick = e => {
    const { onChange } = props;
    if (typeof onChange === "function") onChange(e);
  };
  return (
    <div className="stars">
      {StarCount.map(el => {
        if (rating >= el + 1)
          return (
            <Icon
              onClick={() => {
                onClick(el + 1);
              }}
              size={size}
              key={el}
              icon={starFull}
            />
          );
        return (
          <Icon
            onClick={() => {
              onClick(el + 1);
            }}
            size={size}
            key={el}
            icon={starEmpty}
          />
        );
      })}
    </div>
  );
};
