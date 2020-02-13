import React, { useEffect, useRef } from "react";

const DialogBackground = ({ children, disableBackdropClick, closeDialog }) => {
  const ref = useRef(null);

  useEffect(() => {
    const _handler = e => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDialog();
      }
    };

    ref.current.addEventListener("keydown", _handler);
    return () => {
      ref.current.removeEventListener("keydown", _handler);
    };
  });

  const handleOnClick = () => {
    !disableBackdropClick && closeDialog();
  };

  return (
    <div
      ref={ref}
      id={"dialog-background"}
      className={"dialog-background"}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
};

export default DialogBackground;
