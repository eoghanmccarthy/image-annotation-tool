const DELTA = 1.13;

export default (stage, e, stageInitialScale) => {
  const oldScale = stage.scaleX();

  const mousePointTo = {
    x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
    y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
  };

  let newScale = Math.max(
    stageInitialScale.x,
    e.evt.deltaY > 0 ? oldScale * DELTA : oldScale / DELTA
  );

  return {
    scale: {
      x: newScale,
      y: newScale
    },
    position: {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    }
  };
};
