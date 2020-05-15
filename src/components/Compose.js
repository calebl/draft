import React, {useState, useEffect} from "react";
import Trix from "trix";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link} from "react-router-dom";
import {Container, HeaderContainer} from "../elements";

const ComposeContainer = styled(Container)`
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
  
  trix-toolbar {
    display: none;
  }
  
  trix-editor {
    text-align: left;
  }
  
`;

const EnterButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 0;
  background: grey;
  color: white;
  padding: 10px 20px;
  font-family: karla;

  :active {
    background: white;
    color: grey;
    border: 1px solid gray;
  }
  
  :focus {
    outline: none;
  }
`;

const Compose = ({text, addToStory, history}) => {
  const trixInput = React.createRef();
  const htmlParser = new Parser();
  const [content, setContent] = useState('');

  useEffect(() => {
    trixInput.current.addEventListener("trix-change", event => {
      setContent(event.target.innerHTML);
    });
  }, []);

  const listenForEnter = (e) => {
    if(e.key === "Enter"){
      addText();
      e.preventDefault()
    }
  };

  const addText = () => {
    addToStory(content);
    setContent('');
    trixInput.current.editor.loadHTML("")
  };

  return (
    <ComposeContainer>
      <HeaderContainer>
        <Link to='/'>{'Done'}</Link>
        <Link to='/edit'>Edit</Link>
      </HeaderContainer>
      <ViewContainer>
        {htmlParser.parse(text)}
      </ViewContainer>
      <WriteContainer onKeyPress={listenForEnter} tabindex="0">
        <input type={"hidden"} id={"trix"} value={content}/>
        <trix-editor input="trix" ref={trixInput} />
      </WriteContainer>
      <EnterButton onClick={addText}>Add</EnterButton>

    </ComposeContainer>
  )
};

Compose.propTypes = {
  addToStory: PropTypes.func,
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Compose);