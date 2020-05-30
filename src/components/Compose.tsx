import React, {useState, useEffect, KeyboardEvent} from "react";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles} from "../elements";
import TextEditor from "./TextEditor";

const ComposeContainer = styled(Container)`
  display: flex;
  justify-content: start;
`;

const ViewContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  
  flex: 0.7;
`;

const Column = styled.div`
  flex: 1;
  max-width: 700px;
  position: relative;
`;

const ColumnContent = styled.div`
  padding: 20px;
  color: gray;
  font-size: 14px;
  width: 100%;
`;

const TextColumn = styled(Column)`
  text-align: left;
  line-height: 18px;
  font-size: 14px;
  
  overflow: auto;
  display: flex;
  align-items: flex-end;
`;

const Composer = styled.div`
  margin-top: 5px;
  flex: 1;
  
  trix-toolbar {
    display: none;
  }
  
  trix-editor {
    text-align: left;
    border: 0;
    background-color: #EFEFEF;
  }
  
`;

const ComposerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  margin-right: 5px;
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
  const [textContent, setTextContent] = useState('');

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

  const clearContent = () => {
    setContent('');
    setTextContent('');
  };

  const addText = () => {
    if (content !== '') {
      if(textContent === '---'){
        addToSession("<br/><hr/><br/>")
      } else {
        addToSession(content);
      }
      clearContent();
    }
  };

  const updateContent = (contentAsHtml:string, contentAsText:string) => {
    setContent(contentAsHtml);
    setTextContent(contentAsText);
  };

  const viewText = htmlParser.parse(text ?? '');


  return (
    <ComposeContainer>
      <HeaderContainer>
        <Title>Compose</Title>
        <div>
          {text === '' ? (
            <HeaderLink to='/'>Cancel</HeaderLink>
          ):(
            <React.Fragment>
              <HeaderLink to='/'>Pause</HeaderLink>
              <HeaderLink to='/summary'>Done</HeaderLink>
            </React.Fragment>
          )}

        </div>
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
          {/*<EnterButton onClick={addText} data-testid={'add-button'}>Add</EnterButton>*/}
        </Column>
      </ComposerContainer>
    </ComposeContainer>
  )
};

export default withRouter(Compose);