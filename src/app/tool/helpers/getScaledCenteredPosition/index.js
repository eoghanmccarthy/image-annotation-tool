import getCenteredPosition from "../getCenteredPosition";

export default (container, image, scale) => {
  return new Promise((resolve, reject) => {
    const { offsetWidth, offsetHeight } = container;

    if (
      typeof offsetWidth === "undefined" ||
      typeof offsetHeight === "undefined" ||
      !image ||
      typeof scale === "undefined"
    ) {
      throw Error();
    }

    const position = getCenteredPosition(
      { width: offsetWidth, height: offsetHeight },
      image,
      scale
    );

    const unScale = 1 / scale;

    resolve({
      x: position.x * unScale,
      y: position.y * unScale
    });
  });
};
