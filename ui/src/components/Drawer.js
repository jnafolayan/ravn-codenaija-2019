import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  
  .title {
    text-align: center;
    font-size: 18px;
    font-family: Poppins, sans-serif;
    margin-bottom: 18px;
  }

  .content {
  
  }
`;

export default function Drawer({ title, body }) {
  return (
    <Wrapper>
      <h3 className="title">
        {title}
      </h3>
      <div className="content">
        {body}
      </div>
    </Wrapper>
  );
}
