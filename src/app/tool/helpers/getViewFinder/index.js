export default (stage, group, initialScale) => {
  const unScale = 1 / initialScale.x;

  const scale = stage.scaleX;

  const groupWidth = group.width() * unScale;
  const groupHeight = group.height() * unScale;

  const isGroupLeftVisible =
    stage.x + group.x() * scale > 0 &&
    stage.x + group.x() * scale < stage.width;
  const isGroupTopVisible =
    stage.y + group.y() * scale > 0 &&
    stage.y + group.y() * scale < stage.height;

  const isGroupRightVisible =
    stage.x + group.x() * scale + groupWidth * scale < stage.width &&
    stage.x + group.x() * scale + groupWidth * scale > 0;
  const isGroupBottomVisible =
    stage.y + group.y() * scale + groupHeight * scale < stage.height &&
    stage.y + group.y() * scale + groupHeight * scale > 0;

  const offsetLeftAsFloatOfGroup =
    (Math.abs(stage.x) - group.x() * scale) / (groupWidth * scale);
  const offsetTopAsFloatOfGroup =
    (Math.abs(stage.y) - group.y() * scale) / (groupHeight * scale);

  const offsetRightAsFloatOfGroup =
    (stage.x + group.x() * scale + groupWidth * scale - stage.width) /
    (groupWidth * scale);
  const offsetBottomAsFloatOfGroup =
    (stage.y + group.y() * scale + groupHeight * scale - stage.height) /
    (groupHeight * scale);

  const boundX1 = Math.max(0, Math.min(offsetLeftAsFloatOfGroup, 1));
  const boundY1 = Math.max(0, Math.min(offsetTopAsFloatOfGroup, 1));

  const boundX2 = 1 - Math.max(0, Math.min(offsetRightAsFloatOfGroup, 1));
  const boundY2 = 1 - Math.max(0, Math.min(offsetBottomAsFloatOfGroup, 1));

  return {
    x1: isGroupLeftVisible ? 0 : boundX1,
    y1: isGroupTopVisible ? 0 : boundY1,
    x2: isGroupRightVisible ? 1 : boundX2,
    y2: isGroupBottomVisible ? 1 : boundY2
  };
};
