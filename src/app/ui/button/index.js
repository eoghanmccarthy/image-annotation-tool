import React, { forwardRef } from "react";
import { string, oneOf } from "prop-types";
import cx from "classnames";

import "./button.css";

import buttonBase from "./buttonBase";

const Button = forwardRef(
  (
    {
      children,
      className,
      disabled,
      href = "",
      colour = "#000000",
      shape = "circle",
      ...rest
    },
    forwardedRef
  ) => {
    const Element = href ? "a" : "button";

    return (
      <Element
        ref={forwardedRef}
        {...href && { href: href, target: "_blank" }}
        className={cx("btn", className, {
          disabled: disabled,
          [shape]: shape
        })}
        {...rest}
      >
        {children}
      </Element>
    );
  }
);

export default buttonBase(Button);

Button.propTypes = {
  href: string,
  colour: string,
  shape: oneOf(["rounded", "circle", "capsule"])
};
