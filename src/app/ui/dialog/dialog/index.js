import React, { Fragment, forwardRef } from "react";
import { bool, string, func } from "prop-types";
import { useTransition, animated, config } from "react-spring";
import FocusLock from "react-focus-lock";
import cx from "classnames";

import "./dialog.css";

import Button from "../../button";
import dialogBase from "../dialogBase";
import DialogBackground from "../dialogBackground";

const Dialog = forwardRef(
  (
    {
      children,
      className,
      isVisible,
      toggleContentOverlay,
      closeDialog,
      disableAnim,
      isRaised = true,
      disableBackdropClick = false,
      hideCloseBtn = false,
      ...rest
    },
    forwardedRef
  ) => {
    const transition = useTransition(isVisible, null, {
      immediate: disableAnim,
      from: { opacity: 0, transform: "translateY(+70px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(+50px)" },
      config: (item, state) =>
        state === "leave"
          ? { mass: 1, tension: 380, friction: 40, clamp: true }
          : config.stiff,
      onDestroyed: () => !isVisible && toggleContentOverlay(false)
    });

    return transition.map(({ item, key, props }) =>
      item ? (
        <Fragment key={key}>
          <FocusLock returnFocus>
            <DialogBackground
              disableBackdropClick={disableBackdropClick}
              closeDialog={closeDialog}
            >
              {!hideCloseBtn && (
                <Button
                  className={"xl circle btn__close-modal"}
                  colour={"white"}
                  onClick={closeDialog}
                  variant={"contained"}
                >
                  <i className={"icon icon-close"} />
                </Button>
              )}
              <animated.div
                ref={forwardedRef}
                tabIndex={"-1"}
                style={props}
                className={cx("dialog", className, {
                  active: isVisible,
                  raised: isRaised
                })}
                onClick={e => e.stopPropagation()}
                {...rest}
              >
                {children}
              </animated.div>
            </DialogBackground>
          </FocusLock>
        </Fragment>
      ) : null
    );
  }
);

export default dialogBase(Dialog);

Dialog.propTypes = {
  isRaised: bool,
  toggleContentOverlay: func.isRequired,
  disableBackdropClick: bool,
  hideCloseBtn: bool
};
