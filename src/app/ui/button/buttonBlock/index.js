import React from "react";
import cx from "classnames";

import "./button-block.css";

import baseProps from "../../baseProps";

const ButtonBlock = ({ children, className, ...rest }) => {
  return (
    <div className={cx("button-block", className)} {...rest}>
      {children}
    </div>
  );
};

export default baseProps(ButtonBlock);
