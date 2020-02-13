export default (container, image) => {
  const scaleX = Math.min(container.width / image.width, 1);

  const scaleY = Math.min(container.height / image.height, 1);

  return Math.min(scaleX, scaleY);
};
