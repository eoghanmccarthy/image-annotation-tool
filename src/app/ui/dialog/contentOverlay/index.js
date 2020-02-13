import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { useTransition, animated } from "react-spring";
import cx from "classnames";

const rootNode = document.getElementById("app-root");

const n = () => null;

const ContentOverlay = ({
  attachToRoot,
  attachToElementId,
  isVisible,
  transparent,
  disableAnim,
  onDestroy
}) => {
  const transition = useTransition(isVisible, null, {
    immediate: disableAnim,
    from: { backgroundColor: "rgba(0,0,0,0)" },
    enter: { backgroundColor: "rgba(0,0,0,.7)" },
    leave: { backgroundColor: "rgba(0,0,0,0)" },
    config: (item, state) =>
      state === "leave"
        ? { mass: 1, tension: 400, friction: 20, clamp: true }
        : { mass: 1, tension: 220, friction: 12, clamp: true },
    onDestroyed: () => !isVisible && onDestroy && onDestroy()
  });

  const toRender = props => (
    <animated.div
      id={"content-overlay"}
      style={transparent ? {} : props}
      className={cx("content-overlay", {
        transparent: transparent
      })}
    />
  );

  return transition.map(({ item, key, props }) =>
    item ? (
      <Fragment key={key}>
        {attachToRoot
          ? createPortal(toRender(props), rootNode)
          : attachToElementId
          ? createPortal(
              toRender(props),
              document.getElementById(attachToElementId)
            )
          : toRender(props)}
      </Fragment>
    ) : null
  );
};

export default ContentOverlay;
