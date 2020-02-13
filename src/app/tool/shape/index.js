import React, { useLayoutEffect, useRef } from "react";
import { Rect } from "react-konva";

const Shape = props => {
  const rectRef = useRef();

  const unScale = 1 / props.stageInitialScale.x;

  useLayoutEffect(() => {
    rectRef.current.getLayer().batchDraw();
  });

  const handleOnChange = event => {
    const shape = event.target;

    props.onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY()
    });
  };

  const handleOnMouseEnter = event => {
    const shape = event.target;
    shape.getStage().container().style.cursor = "move";
    rectRef.current.getLayer().draw();
  };

  const handleOnMouseLeave = event => {
    const shape = event.target;
    shape.getStage().container().style.cursor = "crosshair";
    rectRef.current.getLayer().draw();
  };

  const handleOnDragMove = e => {
    const group = e.target.getParent();
    const W = e.target.width() > 0;
    const H = e.target.height() > 0;

    const width = e.target.width();
    const height = e.target.height();

    if (W) {
      e.target.x(
        Math.max(
          0,
          Math.min(e.target.x(), group.width() * unScale - Math.abs(width))
        )
      );
    } else {
      e.target.x(
        Math.max(
          Math.abs(width),
          Math.min(e.target.x(), group.width() * unScale)
        )
      );
    }

    if (H) {
      e.target.y(
        Math.max(
          0,
          Math.min(e.target.y(), group.height() * unScale - Math.abs(height))
        )
      );
    } else {
      e.target.y(
        Math.max(
          Math.abs(height),
          Math.min(e.target.y(), group.height() * unScale)
        )
      );
    }
  };

  return (
    <Rect
      _useStrictMode
      ref={rectRef}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      scaleX={1}
      scaleY={1}
      strokeScaleEnabled={false}
      stroke={props.stroke}
      strokeWidth={3}
      name={props.name}
      onDragEnd={handleOnChange}
      onTransformEnd={handleOnChange}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onDragMove={handleOnDragMove}
      // onDragMove={e => {
      //   const stage = e.target.getStage();
      //   const W = e.target.width() > 0;
      //   const H = e.target.height() > 0;

      //   if (W) {
      //     e.target.x(
      //       Math.max(
      //         0,
      //         Math.min(e.target.x(), stage.width() - Math.abs(e.target.width()))
      //       )
      //     );
      //   } else {
      //     e.target.x(
      //       Math.max(
      //         Math.abs(e.target.width()),
      //         Math.min(e.target.x(), stage.width())
      //       )
      //     );
      //   }

      //   if (H) {
      //     e.target.y(
      //       Math.max(
      //         0,
      //         Math.min(
      //           e.target.y(),
      //           stage.height() - Math.abs(e.target.height())
      //         )
      //       )
      //     );
      //   } else {
      //     e.target.y(
      //       Math.max(
      //         Math.abs(e.target.height()),
      //         Math.min(e.target.y(), stage.height())
      //       )
      //     );
      //   }
      // }}
      draggable
    />
  );
};

export default Shape;
