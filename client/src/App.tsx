import React, { useState, useEffect, useRef } from "react";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function App() {
  return (
    <div>
      <Parallax pages={5}>
        <ParallaxLayer></ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
