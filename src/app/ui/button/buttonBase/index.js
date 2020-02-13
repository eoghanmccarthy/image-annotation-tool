import React from "react";
import { string, bool, oneOf, func } from "prop-types";

import baseProps from "../../baseProps";

const n = () => null;

const buttonBase = Component => {
  const BaseComponent = props => {
    const {
      role = "button",
      type = "button",
      tabIndex = "0",
      disabled = false,
      onClick = n,
      ...rest
    } = props;

    return (
      <Component
        disabled={disabled}
        role={role}
        type={type}
        tabIndex={tabIndex}
        onClick={onClick}
        {...rest}
      />
    );
  };

  BaseComponent.propTypes = {
    disabled: bool,
    role: string,
    type: oneOf(["button", "submit", "reset"]),
    tabIndex: string,
    onClick: func
  };

  return baseProps(BaseComponent);
};

export default buttonBase;
