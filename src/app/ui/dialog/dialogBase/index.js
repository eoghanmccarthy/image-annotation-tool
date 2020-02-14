import React, { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { string, bool, func } from "prop-types";

import baseProps from "../../baseProps";

import ContentOverlay from "../contentOverlay";

const rootNode = document.getElementById("root");

const n = () => null;

const baseDialog = Component => {
  const BaseDialog = ({
    transparent = false,
    attachToRoot = false,
    attachToElementId = "",
    isVisible = false,
    disableAnim = false,
    closeDialog,
    onDestroy = n,
    ...rest
  }) => {
    const [overlayIsVisible, toggleOverlay] = useState(false);

    useEffect(() => {
      isVisible && toggleOverlay(true);
    }, [isVisible]);

    const toRender = () => (
      <Component
        isVisible={isVisible}
        disableAnim={disableAnim}
        toggleContentOverlay={toggleOverlay}
        closeDialog={closeDialog}
        onDestroy={onDestroy}
        {...rest}
      />
    );

    return (
      <Fragment>
        {attachToRoot
          ? createPortal(toRender(), rootNode)
          : attachToElementId
          ? createPortal(toRender(), document.getElementById(attachToElementId))
          : toRender()}
        <ContentOverlay
          attachToRoot={attachToRoot}
          attachToElementId={attachToElementId}
          disableAnim={disableAnim}
          transparent={transparent}
          isVisible={overlayIsVisible}
          onDestroy={onDestroy}
        />
      </Fragment>
    );
  };

  BaseDialog.propTypes = {
    transparent: bool,
    attachToRoot: bool,
    attachToElementId: string,
    isVisible: bool.isRequired,
    disableAnim: bool,
    closeDialog: func.isRequired,
    onDestroy: func
  };

  return baseProps(BaseDialog);
};

export default baseDialog;
