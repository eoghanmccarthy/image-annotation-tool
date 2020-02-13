import React, { useEffect, useRef } from "react";
import { Transformer } from "react-konva";

const RectTransformer = ({ selectedShapeName = "" }) => {
  const transRef = useRef();

  useEffect(() => {
    checkNode();
  });

  const checkNode = () => {
    const stage = transRef.current.getStage();
    const selectedNode = stage.findOne(`.${selectedShapeName}`);
    if (selectedNode === transRef.current.node()) {
      return;
    }

    if (selectedNode) {
      transRef.current.attachTo(selectedNode);
    } else {
      transRef.current.detach();
    }
  };

  return (
    <Transformer
      ref={transRef}
      borderEnabled={false}
      rotateEnabled={false}
      keepRatio={false}
      ignoreStroke
      boundBoxFunc={(oldBox, newBox) => {
        const stage = transRef.current.getStage();
        const W = newBox.width > 0;
        const H = newBox.height > 0;

        if (W) {
          if (
            newBox.x < 0 ||
            Math.abs(newBox.width) + newBox.x > stage.width()
          ) {
            return oldBox;
          }
        } else {
          if (Math.abs(newBox.width) > newBox.x || newBox.x > stage.width()) {
            return oldBox;
          }
        }

        if (H) {
          if (
            newBox.y < 0 ||
            Math.abs(newBox.height) + newBox.y > stage.height()
          ) {
            return oldBox;
          }
        } else {
          if (Math.abs(newBox.height) > newBox.y || newBox.y > stage.height()) {
            return oldBox;
          }
        }

        return newBox;
      }}
    />
  );
};

export default RectTransformer;
