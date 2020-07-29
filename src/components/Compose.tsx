import React, {useState, useEffect, KeyboardEvent, Profiler, ProfilerOnRenderCallback} from "react";
import {Parser} from 'html-to-react';
import styled from "styled-components";
import PropTypes from "prop-types";
import debounce from "debounce";
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
  typing: string,
  addToSession: (text : string) => void,
  setTyping: (typing : string) => void
}

let renderCount = 0;

const Compose = ({text, typing, addToSession, setTyping} : PropTypes) => {
  const messagesEndRef = React.createRef<HTMLDivElement>();
  const htmlParser = new Parser();
  const [content, setContent] = useState(typing);
  const debounceSave = debounce(setTyping, 1000);

  const scrollToBottom = () => {
    if (messagesEndRef.current?.scrollIntoView) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    debounceSave(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[content]);

  useEffect(scrollToBottom, [text]);

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

  const renderProfilerCallback : ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions ) => {

    console.log(`${id} - ${phase} - ${actualDuration} - ${commitTime}`, commitTime);
    console.log(interactions);

    renderCount += 1;

    console.log('render count: ' + renderCount);

  }

  return (
    <Profiler id={"Compose"} onRender={renderProfilerCallback}>
    <ComposeContainer>
      <HeaderContainer>
        <Title data-cy={'header'}/>
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
    </Profiler>
  )
};

export default withRouter(Compose);