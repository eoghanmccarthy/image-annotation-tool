import React, { useEffect, useMemo, useState } from "react";

import { ImageContext } from "./context";

const images = [
  "http://eoghanmccarthy.com/assets/cca7d62ffbd7e69eb4b5ce562ffb88fd.jpg",
  "http://eoghanmccarthy.com/assets/33e932d6c205895d393f486f8f768457.jpg",
  "http://eoghanmccarthy.com/assets/6d25a5634cd24b7cb3eeae74533a1243.jpg"
];

const ImageProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    handleGetImage();
  }, []);

  const handleGetImage = () => {
    setImage(null);

    const url = images[Math.floor(Math.random() * images.length)];

    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setImage(img);
    };
    return image;
  };

  const values = useMemo(() => {
    return {
      value: {
        image: image
      },
      actions: {
        getImage: handleGetImage
      }
    };
  }, [image]);

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
};

export default ImageProvider;
