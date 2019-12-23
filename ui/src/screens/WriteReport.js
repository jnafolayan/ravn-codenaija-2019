import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import axios from "axios";
import wrapApi from "../request";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";
import { NewsContext } from "../contexts/NewsContext";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function WriteReport({ userCoords }) {
  const { state: theme } = useContext(ThemeContext);
  const { state: auth } = useContext(AuthContext);
  const { dispatch: newsDispatch } = useContext(NewsContext);

  const [state, setState] = useState({
    title: "",
    description: "",
    category: "Security",
    location: { type: "Point", coordinates: null  }
  });

  const onInputChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    axios.post(wrapApi("/feeds"), {
      ...state,
      location: { 
        type: "Point", 
        coordinates: [userCoords.lat, userCoords.lng]
      }
    })
      .then(resp => {
        console.log("Report successful");
        newsDispatch({
          type: "PUSH",
          payload: {
            user: {
              location: [userCoords.lng, userCoords.lat]
            },
            report: {
              _id: Math.random(),
              headline: state.title,
              views: Math.floor(Math.random() * 100),
              location: userCoords,
              place: "4th, Allen Avenue",
              date: new Date()
            }
          }
        });
        navigate("/");
      })
      .catch((e) => {
        console.error(e.response);
        alert("Could not make report. Sorry!");
      });
  };

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <Form
          onSubmit={submitForm}
          action=""
          method="POST"
        >
          <Heading>Make a report</Heading>

          <FormGroup>
            <input type="text" name="title" placeholder="Title" onChange={onInputChange} /> 
          </FormGroup>

          <FormGroup>
            <textarea 
              name="description" 
              placeholder="Any extra information we should know of?" 
              rows="5" 
              onChange={onInputChange}>
            </textarea> 
          </FormGroup>

          <FormGroup>
            <button type="submit">SUBMIT</button>
          </FormGroup>
        </Form>
      </InnerWrapper>

      <Navbar />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 75px calc(100vh - 150px) 75px;

  @media (orientation: landscape) {
    grid-template-rows: 75px 100vw 75px;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(10,10,10,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 18px;
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

  input,
  textarea {
    border: none;
    border-radius: 8px;
    background: rgba(220,220,220,0.6);
    font-family: "Open Sans", sans-serif;
    width: 100%;
    padding: 12px 12px;
    font-size: 1rem;
    color: #fff;
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

  textarea {
    
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