import React, {useState, useEffect} from "react";
import Trix from "trix";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link} from "react-router-dom";
import {Container, HeaderContainer, Title} from "../elements";

const ComposeContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const ViewContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

const TextColumn = styled.div`
  text-align: left;
  flex: 1;
  width: 400px;
  padding: 20px;
  line-height: 18px;
  font-size: 12px;
  max-width: 400px;
  background: lightgray;
  
  overflow: auto;
`

const Composer = styled.div`
  padding: 5px;
  flex: 1;
  
  trix-toolbar {
    display: none;
  }
  
  trix-editor {
    text-align: left;
  }
  
`;

const ComposerContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  
  max-width: 500px;
`;

const EnterButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.purple};
  background: ${props => props.theme.purple};
  color: white;
  padding: 10px 20px;
  font-weight: bold;

  :active {
    background: white;
    color: ${props => props.theme.purple};
  }
  
  :focus {
    outline: none;
  }
`;

const Compose = ({text, addToSession, recordSession}) => {
  const trixInput = React.createRef();
  const messagesEndRef = React.createRef();
  const storyTextRef = React.createRef();
  const htmlParser = new Parser();
  const [content, setContent] = useState('');

  const scrollToBottom = () => {
    if(messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView();
    }
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
    if(content !== '') {
      addToSession(content);
      setContent('');
      if (trixInput.current.editor) {
        trixInput.current.editor.loadHTML("")
      }
    }
  };

  const viewText = htmlParser.parse(text);

  return (
    <ComposeContainer>
      <HeaderContainer>
        <Title>Compose</Title>
        <Link to='/'>Done</Link>
      </HeaderContainer>
      <ViewContainer ref={storyTextRef}>
        <TextColumn>
          {viewText}
          <div ref={messagesEndRef}/>
        </TextColumn>
      </ViewContainer>
      <ComposerContainer>
        <Composer onKeyPress={listenForEnter} tabindex="0">
          <input type={"hidden"} id={"trix"} value={content}/>
          <trix-editor input="trix" ref={trixInput} data-testid={"compose-editor"} />
        </Composer>
        <EnterButton onClick={addText} data-testid={'add-button'}>Add</EnterButton>
      </ComposerContainer>
    </ComposeContainer>
  )
};

Compose.propTypes = {
  addToSession: PropTypes.func.isRequired,
  recordSession: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default withRouter(Compose);