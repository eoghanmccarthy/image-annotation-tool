import React from "react";
import { string } from "prop-types";
import cx from "classnames";

import "./dialog-header.css";

import baseProps from "../../baseProps";

const DialogHeader = baseProps(props => {
  const { children, className, title = "", ...rest } = props;

  return (
    <header className={cx("dialog-header", className)} {...rest}>
      <h2>{title}</h2>
      {children}
    </header>
  );
});

DialogHeader.propTypes = {
  title: string
};

export default baseProps(DialogHeader);
