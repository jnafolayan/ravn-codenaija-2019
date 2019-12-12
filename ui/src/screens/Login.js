import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 18px;
`;

const Form = styled.form`
  width: 100%;
  padding: 18px 0;
  margin: 20px auto;
`;

const Heading = styled.h3`
  text-align: center;
  font-family: Poppins, sans-serif;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  padding: 0 8px;

  input {
    border: none;
    border-bottom: 1px solid #555;
    font-family: "Open Sans", sans-serif;
    width: 100%;
    padding: 8px;
    font-size: 18px;

    &:focus {
      outline: none;
    }
  }

  button {
    display: block;
    padding: 20px 18px;
    background: hsl(40, 100%, 40%);
  }
`;

export default function Login() {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const onInputChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={null}>
        <Heading>
          Sign in to <span>Rav'n</span>
        </Heading>

        <FormGroup>
          <input type="text" name="username" onChange={onInputChange} /> 
        </FormGroup>

        <FormGroup>
          <input type="text" name="password" onChange={onInputChange} /> 
        </FormGroup>

        <FormGroup>
          <button type="submit">CONTINUE</button>
        </FormGroup>
      </Form>
    </Wrapper>
  );
}
