import React from "react";
import cx from "classnames";

import baseProps from "../../baseProps";

const DialogMain = baseProps(props => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx("dialog-main", className)} {...rest}>
      {children}
    </div>
  );
});

export default baseProps(DialogMain);
