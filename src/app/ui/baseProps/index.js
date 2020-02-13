import React from "react";
import { string } from "prop-types";

const baseProps = Component => {
  const BaseComponent = props => {
    const { id, className, ...rest } = props;

    return <Component id={id} className={className} {...rest} />;
  };

  BaseComponent.propTypes = {
    id: string,
    className: string
  };

  return BaseComponent;
};

export default baseProps;
