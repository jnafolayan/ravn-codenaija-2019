import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  
`;

export default function Drawer({ title, body }) {
  return (
    <Wrapper>
      <Title>
        {title}
      </Title>
      <Content>
        {body}
      </Content>
    </Wrapper>
  );
}
