import React, {useState, useEffect} from "react";
import Trix from "trix";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";

const ComposeContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const ViewContainer = styled.div`
  height: 400px;
`;

const WriteContainer = styled.div`
  padding: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Compose = props => {
  const trixInput = React.createRef();
  const htmlParser = new Parser();

  useEffect(() => {
    trixInput.current.addEventListener("trix-change", event => {
      console.log("trix change event fired");
      props.onChange(event.target.innerHTML); //calling custom event
    });
  });

  return (
    <ComposeContainer>
      <ViewContainer>
        {htmlParser.parse(props.value)}
      </ViewContainer>
      <WriteContainer>
        <input type={"hidden"} id={"trix"} value={props.value}/>
        <trix-editor input="trix" ref={trixInput} />
      </WriteContainer>

    </ComposeContainer>
  )
};

Compose.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default Compose;