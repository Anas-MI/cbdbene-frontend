import React from "react";
import { Transition } from "react-transition-group";
export default props => {
  const { duration, className, unmountOnExit, mountOnEnter } = props;
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };

  const defaultDuration = 400;

  const defaultStyle = {
    transition: `opacity ${duration || defaultDuration}ms ease-in-out`,
    opacity: 0
  };
  return (
    <Transition
      in={props.in}
      timeout={duration || defaultDuration}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
    >
      {state => (
        <div
          className={className || ""}
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {props.children}
        </div>
      )}
    </Transition>
  );
};
