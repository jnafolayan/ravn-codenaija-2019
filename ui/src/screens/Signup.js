import React, { useState, useContext } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import styled from "styled-components";

import wrapApi from "../request";
import { AuthContext } from "../contexts/AuthContext";
import CityBG from "../assets/img/city-bg.jpg";

const Wrapper = styled.div`
  padding: 20px 18px;
  background-image: url(${CityBG});
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(10,10,10,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 767px;
  padding: 18px 0;
  margin: 20px auto;
  margin-top: -20px;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: Poppins, sans-serif;
  margin-bottom: 24px;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  padding: 0 8px;

  .alt {
    margin-top: 4rem;
    text-align: center;
    color: #ccc;
    font-size: 1rem;
    font-family: "Open Sans", sans-serif;

    a {
      color: #fff;
    }
  }

  input {
    border: none;
    border-radius: 8px;
    background: rgba(220,220,220,0.6);
    font-family: "Open Sans", sans-serif;
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    color: #000;
    transition: all 0.3s;

    &::placeholder {
      color: #ddd;
    }

    &:focus {
      outline: none;
      background: #fff;
      color: #222;
    }
  }

  button {
    display: block;
    width: 150px;
    
    font-family: Poppins, sans-serif;
    font-size: 1rem;
    font-weight: bold;

    text-align: center;
    background: hsl(52, 100%, 43%);
    border-radius: 8px;

    margin: 0 auto;
    padding: 16px 12px;
  }
`;

export default function Login() {
  const { dispatch } = useContext(AuthContext);

  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    fullname: ""
  });

  const onInputChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    axios.post(wrapApi("/users/signup"), state)
      .then(resp => {
        dispatch({
          type: "LOGIN",
          payload: {
            user: { 
              ...state
            },
            token: null
          }
        });

        navigate("/");
      })
      .catch(() => alert("Sorry! Could not sign you up"));
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Form
          onSubmit={submitForm}
          action=""
          method="POST"
        >
          <Heading>
            Sign up
          </Heading>

          <FormGroup>
            <input type="text" name="username" placeholder="Username" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <input type="password" name="password" placeholder="Password" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <input type="email" name="email" placeholder="Email" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <input type="text" name="fullname" placeholder="Full name" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <input type="tel" name="phoneNumber" placeholder="Phone" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <button type="submit">CONTINUE</button>
          </FormGroup>

          <FormGroup>
            <p className="alt">Already have an account? <Link to="/login">Sign in</Link></p>
          </FormGroup>
        </Form>
      </InnerWrapper>
    </Wrapper>
  );
}
