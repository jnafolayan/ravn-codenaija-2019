import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function PushButton() {
  const canvasRef = useRef();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (!firstRender) return;
    setFirstRender(false);

    
  }, [firstRender]);

  return (
    <Wrapper>
      <canvas ref={canvasRef}></canvas>
    </Wrapper>
  );
}