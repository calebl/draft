import React, {useState, useEffect} from "react";
import Trix from "trix";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles, ButtonStyles} from "../elements";

const ComposeContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const ViewContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  
  flex: 1;
`;

const Column = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
`;

const ColumnContent = styled.div`
  padding: 20px;
`;

const TextColumn = styled(Column)`
  text-align: left;
  line-height: 18px;
  font-size: 14px;
  background: lightgray;
  
  overflow: auto;
`;

const Composer = styled.div`
  margin-top: 5px;
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
`;

const EnterButton = styled.button`
  ${ButtonStyles}

  position: absolute;
  bottom: 5px;
  right: 5px;
  border: 0;
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
`;

const Compose = ({text, addToSession, recordSession}) => {
  const trixInput = React.createRef();
  const messagesEndRef = React.createRef();
  const storyTextRef = React.createRef();
  const htmlParser = new Parser();
  const [content, setContent] = useState('');

  const scrollToBottom = () => {
    if (messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(scrollToBottom, [content]);

  useEffect(() => {

  }, [content]);

  useEffect(() => {
    trixInput.current.addEventListener("trix-change", event => {
      setContent(event.target.innerHTML);
    });
  }, []);

  const listenForEnter = (e) => {
    if (e.key === "Enter") {
      addText();
      e.preventDefault()
    }
  };

  const addText = () => {
    if (content !== '') {
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
        <HeaderLink to='/edit'>Done</HeaderLink>
      </HeaderContainer>
      <ViewContainer ref={storyTextRef}>
        <TextColumn>
          <ColumnContent>
            {viewText}
            <div ref={messagesEndRef}/>
          </ColumnContent>
        </TextColumn>
      </ViewContainer>
      <ComposerContainer>
        <Column>
          <Composer onKeyPress={listenForEnter} tabindex="0">
            <input type={"hidden"} id={"trix"} value={content}/>
            <trix-editor input="trix" ref={trixInput} data-testid={"compose-editor"}/>
          </Composer>
          <EnterButton onClick={addText} data-testid={'add-button'}>Add</EnterButton>
        </Column>
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