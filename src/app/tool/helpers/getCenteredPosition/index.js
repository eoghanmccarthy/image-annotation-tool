export default (container, image, scale) => {
  return {
    x: Math.max((container.width - image.width * scale) / 2, 0),
    y: Math.max((container.height - image.height * scale) / 2, 0)
  };
};
