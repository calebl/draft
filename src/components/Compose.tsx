import React, {useState, useEffect, KeyboardEvent} from "react";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles, HeaderActions} from "../elements";
import TextEditor from "./TextEditor";
import {countWords} from "../utils/counter";

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

const WordCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: lightgray;
  font-size: 14px;
  padding-left: 30px;
  
  &:hover {
    color: gray;
  }
`;

const ComposerContainer = styled.div`
  display: flex;
  justify-content: center;
`;


interface HeaderLinkProps {
  visible?: boolean;
}

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  visibility: ${(props: HeaderLinkProps) => props.visible === false ? 'hidden' : 'visible'};
  
  margin-right: 5px;
`;

interface PropTypes extends RouteComponentProps {
  text?: string,
  addToSession: (text : string) => void
}

const Compose = ({text, addToSession} : PropTypes) => {
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

  const clearContent = () => {
    setContent('');
  };

  const addText = () => {
    if (content !== '') {
      addToSession(content);
      clearContent();
    }
  };

  const updateContent = (contentAsHtml:string) => {
    setContent(contentAsHtml);
  };

  const viewText = htmlParser.parse(text ?? '');
  const wordCount = (text !== undefined ? countWords(text) : 0) + (content === "" ? 0 : content.split(' ').length);

  return (
    <ComposeContainer>
      <HeaderContainer>
        <Title data-cy={'header'}></Title>
        <HeaderActions>
          {text === '' ? (
            <HeaderLink to='/'>Cancel</HeaderLink>
          ):(
            <React.Fragment>
              <HeaderLink data-cy={"pause-session"} to='/'>Pause</HeaderLink>
              <HeaderLink visible={content === ''} data-cy={"session-done"} to='/summary'>Done</HeaderLink>
            </React.Fragment>
          )}

        </HeaderActions>
      </HeaderContainer>
      <ViewContainer>
        <TextColumn>
          <ColumnContent data-cy={"rendered-text"}>
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
      <WordCount data-cy={"word-count"}>{wordCount}</WordCount>
    </ComposeContainer>
  )
};

export default withRouter(Compose);