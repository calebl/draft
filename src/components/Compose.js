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
  text-align: left;
  flex: 1;
  width: 400px;
  padding: 20px;
  line-height: 18px;
  font-size: 12px;
  
  overflow: auto;
`;

const WriteContainer = styled.div`
  padding: 5px;
  
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

const Compose = ({text, addToStory}) => {
  const trixInput = React.createRef();
  const messagesEndRef = React.createRef();
  const storyTextRef = React.createRef();
  const htmlParser = new Parser();
  const [content, setContent] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView();
  };

  useEffect(scrollToBottom, [content]);

  useEffect(()=> {

  }, [content]);

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
    if(trixInput.current.editor) {
      trixInput.current.editor.loadHTML("")
    }
  };

  const viewText = htmlParser.parse(text);

  return (
    <ComposeContainer>
      <HeaderContainer>
        <Link to='/'>Done</Link>
        <Link to='/edit'>Edit</Link>
      </HeaderContainer>
      <ViewContainer ref={storyTextRef}>
        {viewText}
        <div ref={messagesEndRef}/>
      </ViewContainer>
      <WriteContainer onKeyPress={listenForEnter} tabindex="0">
        <input type={"hidden"} id={"trix"} value={content}/>
        <trix-editor input="trix" ref={trixInput} data-testid={"compose-editor"} />
      </WriteContainer>
      <EnterButton onClick={addText} data-testid={'add-button'}>Add</EnterButton>

    </ComposeContainer>
  )
};

Compose.propTypes = {
  addToStory: PropTypes.func,
  text: PropTypes.string
};

export default withRouter(Compose);