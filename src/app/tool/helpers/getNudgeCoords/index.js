const DELTA = 1;

export default (image, node, code) => {
  const { width, height } = image.data;
  if (
    typeof width === "undefined" ||
    typeof height === "undefined" ||
    typeof !node.x() === "undefined" ||
    typeof !node.y() === "undefined" ||
    !code
  ) {
    return;
  }

  let nudge = node;

  if (code === 37) {
    if (node.x() - DELTA <= 0) {
      return;
    }

    nudge.x(node.x() - DELTA);
  } else if (code === 38) {
    if (node.y() - DELTA <= 0) {
      return;
    }

    nudge.y(node.y() - DELTA);
  } else if (code === 39) {
    if (node.x() + node.width() + DELTA >= width) {
      return;
    }

    nudge.x(node.x() + DELTA);
  } else if (code === 40) {
    if (node.y() + node.height() + DELTA >= height) {
      return;
    }

    nudge.y(node.y() + DELTA);
  }

  return nudge;
};
