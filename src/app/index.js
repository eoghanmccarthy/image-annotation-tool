import React from "react";

import Tool from "./tool";
import ImageProvider from "./tool/imageProvider";

const App = () => {
  return (
    <ImageProvider>
      <Tool />
    </ImageProvider>
  );
};

export default App;
