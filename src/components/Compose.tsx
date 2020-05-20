import React, {useState, useEffect, KeyboardEvent} from "react";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles, ButtonStyles} from "../elements";
import TextEditor from "./TextEditor";

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

interface PropTypes extends RouteComponentProps {
  text?: string,
  addToSession: (text : string) => void,
  recordSession: (session : Session) => void
}

const Compose = ({text, addToSession, recordSession} : PropTypes) => {
  const messagesEndRef = React.createRef<HTMLDivElement>();
  const htmlParser = new Parser();
  const [content, setContent] = useState('');

  const scrollToBottom = () => {
    if (messagesEndRef.current?.scrollIntoView) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(scrollToBottom, [content]);

  const listenForEnter = (e : KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addText();
    }
  };

  const addText = () => {
    if (content !== '') {
      addToSession(content);
      setContent('');
    }
  };

  const updateContent = (newContent:string) => {
    setContent(newContent);
  }

  const viewText = htmlParser.parse(text ?? '');


  return (
    <ComposeContainer>
      <HeaderContainer>
        <Title>Compose</Title>
        <HeaderLink to='/edit'>Done</HeaderLink>
      </HeaderContainer>
      <ViewContainer>
        <TextColumn>
          <ColumnContent>
            {viewText}
            <div ref={messagesEndRef}/>
          </ColumnContent>
        </TextColumn>
      </ViewContainer>
      <ComposerContainer>
        <Column>
          <Composer onKeyPress={listenForEnter} tabIndex={0}>
            <TextEditor content={content} textChanged={updateContent} />
          </Composer>
          <EnterButton onClick={addText} data-testid={'add-button'}>Add</EnterButton>
        </Column>
      </ComposerContainer>
    </ComposeContainer>
  )
};

export default withRouter(Compose);