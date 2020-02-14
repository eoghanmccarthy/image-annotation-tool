import React, { useState, useEffect, useContext, useRef } from "react";
import { Stage, Layer, Group, Image } from "react-konva";
import shortid from "shortid";

import "./tool.css";

import { ImageContext } from "./context";

import { Button } from "../ui/button";
import List from "./list";
import Shape from "./shape";
import RectTransformer from "./transformer";

import getStageZoom from "./helpers/getStageZoom";
import getViewFinder from "./helpers/getViewFinder";
import getScale from "./helpers/getScale";
import getScaledCenteredPosition from "./helpers/getScaledCenteredPosition";

const colours = ["#6514ff", "#ff6514", "#14ff65"];
const shapeClassNames = ["Rect", "Circle", "Ring"];

const Tool = () => {
  const imageCxt = useContext(ImageContext);

  const { image } = imageCxt.value;
  const { getImage } = imageCxt.actions;

  const stageRef = useRef();
  const imgLayerRef = useRef(null);
  const imageRef = useRef(null);
  const shapeLayerRef = useRef(null);
  const shapeGroupRef = useRef(null);

  const [stageInitialScale, setStageInitialScale] = useState({ x: 1, y: 1 });
  const [viewFinder, setViewFinder] = useState(null);

  const [rectangles, setRectangles] = useState([]);
  const [rectCount, setRectCount] = useState(0);
  const [selectedShapeName, setSelectedShapeName] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDraw, setMouseDraw] = useState(false);
  const [newRectX, setNewRectX] = useState(0);
  const [newRectY, setNewRectY] = useState(0);

  useEffect(() => {
    imgLayerRef.current && imgLayerRef.current.moveToBottom();
  }, [imgLayerRef]);

  useEffect(() => {
    window.addEventListener("resize", handleSetStageInitialValues, false);
    return () => {
      window.removeEventListener("resize", handleSetStageInitialValues, false);
    };
  });

  const handleSetStageInitialValues = async () => {
    const { offsetWidth, offsetHeight } = document.getElementById("canvas");

    const stage = stageRef.current;

    const scale = getScale(
      {
        width: offsetWidth,
        height: offsetHeight
      },
      image
    );

    if (!scale) {
      return;
    }

    stage.setAttrs({
      width: offsetWidth,
      height: offsetHeight,
      scaleX: scale,
      scaleY: scale,
      x: 0,
      y: 0
    });

    setStageInitialScale({ x: scale, y: scale });

    const position = await getScaledCenteredPosition(
      {
        offsetWidth,
        offsetHeight
      },
      image,
      scale
    ).catch(err => {
      console.log(err);
    });

    //imageRef.current.setAttrs(position);

    shapeGroupRef.current.setAttrs({
      width: image.width * scale,
      height: image.height * scale,
      ...position
    });

    handleResetViewFinder();
    stage.batchDraw();
  };

  const handleResetViewFinder = () =>
    setViewFinder({
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1
    });

  const _onStageMouseDown = event => {
    if (event.target.className === "Image") {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      setMouseDown(true);
      setNewRectX(mousePos.x);
      setNewRectY(mousePos.y);
      setSelectedShapeName("");
      return;
    }

    const clickedOnTransformer =
      event.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = event.target.name();
    const rect = rectangles.find(r => r.name === name);
    if (rect) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  const _onRectChange = (index, newProps) => {
    let updatedRect = {
      ...rectangles[index],
      ...newProps
    };
    let newRects = [
      ...rectangles.slice(0, index),
      (rectangles[index] = updatedRect),
      ...rectangles.slice(index + 1)
    ];

    setRectangles(newRects);
  };

  const _onNewRectChange = event => {
    const stage = event.target.getStage();
    const mousePos = stage.getPointerPosition();

    if (!rectangles[rectCount]) {
      const id = shortid.generate();

      let newRect = {
        x: newRectX,
        y: newRectY,
        width: mousePos.x - newRectX,
        height: mousePos.y - newRectY,
        id: id,
        name: `rect${rectCount + 1}`,
        stroke: colours[Math.floor(Math.random() * colours.length)],
        key: id
      };
      setMouseDraw(true);
      setRectangles([...rectangles, newRect]);
      return;
    }

    let updatedRect = {
      ...rectangles[rectCount],
      width: mousePos.x - newRectX,
      height: mousePos.y - newRectY
    };

    let newRects = [
      ...rectangles.slice(0, rectCount),
      (rectangles[rectCount] = updatedRect),
      ...rectangles.slice(rectCount + 1)
    ];

    return setRectangles(newRects);
  };

  const _onStageMouseUp = () => {
    if (mouseDraw) {
      setRectCount(rectCount + 1);
      setMouseDraw(false);
    }
    setMouseDown(false);
  };

  const handleOnStageDragStart = async e => {
    const stage = e.target.getStage();
    if (shapeClassNames.includes(e.target.className)) {
      return;
    }
    if (!e.evt.ctrlKey) {
      stage.stopDrag();
    }
  };

  const handleOnStageDragMove = async e => {
    const stage = e.target.getStage();

    if (shapeClassNames.includes(e.target.className)) {
      return;
    }

    const view = getViewFinder(
      {
        width: stage.width(),
        height: stage.height(),
        scaleX: stage.scaleX(),
        scaleY: stage.scaleY(),
        x: stage.x(),
        y: stage.y()
      },
      shapeGroupRef.current,
      stageInitialScale
    );

    if (!view) {
      handleResetViewFinder();
      return;
    }

    setViewFinder(view);
    stage.batchDraw();
  };

  const handleOnWheel = e => {
    const stage = stageRef.current;
    e.evt.preventDefault();

    const zoom = getStageZoom(stage, e, stageInitialScale);

    const view = getViewFinder(
      {
        width: stage.width(),
        height: stage.height(),
        scaleX: zoom.scale.x,
        scaleY: zoom.scale.y,
        ...zoom.position
      },
      shapeGroupRef.current,
      stageInitialScale
    );

    if (!zoom || !view) {
      return;
    }

    stage.setAttrs({
      scale: zoom.scale,
      position: zoom.position
    });

    setViewFinder(view);
    stage.batchDraw();
  };

  const handleResetStageValues = () => {
    const stage = stageRef.current;

    stage.setAttrs({
      scale: stageInitialScale,
      position: { x: 0, y: 0 }
    });

    handleResetViewFinder();
    stage.batchDraw();
  };

  return (
    <main id={"tool"}>
      <section id={"list"}>
        <Button onClick={getImage} />
        <Button onClick={handleResetStageValues} />
        <List
          data={rectangles || []}
          selectedShapeName={selectedShapeName}
          setSelectedShapeName={setSelectedShapeName}
        />
      </section>
      <section id={"canvas"}>
        <div id="stage-container">
          <Stage
            draggable
            ref={stageRef}
            container={"stage-container"}
            width={745}
            height={480}
            onContentContextMenu={e => e.evt.preventDefault()}
            onMouseDown={_onStageMouseDown}
            onMouseMove={mouseDown && _onNewRectChange}
            onMouseUp={mouseDown && _onStageMouseUp}
            onDragStart={handleOnStageDragStart}
            onDragMove={handleOnStageDragMove}
            onWheel={handleOnWheel}
          >
            <Layer ref={shapeLayerRef}>
              <Group ref={shapeGroupRef}>
                {rectangles.map((rect, i) => {
                  const { id, name } = rect;

                  if (!id || !name) {
                    return null;
                  }

                  return (
                    <Shape
                      key={i}
                      {...rect}
                      stageInitialScale={stageInitialScale}
                      onTransform={newProps => {
                        _onRectChange(i, newProps);
                      }}
                    />
                  );
                })}
                <RectTransformer
                  stageInitialScale={stageInitialScale}
                  selectedShapeName={selectedShapeName}
                />
              </Group>
            </Layer>
            <Layer ref={imgLayerRef}>
              <Image ref={imageRef} height={480} width={745} image={image} />
            </Layer>
          </Stage>
        </div>
      </section>
    </main>
  );
};

export default Tool;
