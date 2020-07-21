import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {countWords} from "../utils/counter";

import {Container, HeaderActions, HeaderActionStyles, HeaderContainer, Title} from "../elements";

const ViewContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  
  flex: 1;
`;

const Column = styled.div`
  flex: 1;
  position: relative;
  width: 50%;
  overflow: auto;
`;

const ColumnContent = styled.div`
  padding: 20px;
`;

const TextColumn = styled.div`
  padding: 40px 20px;
  background-color: #EFEFEF;
  overflow: auto;
  height: 100%;
  text-align: left;
  border-radius: ${props => props.theme.borderRadius};
  
  white-space: pre-wrap;
  pre {
    white-space: pre-wrap;
  }
`;

const SummaryColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const StyledButton = styled.button`
  ${HeaderActionStyles}
  
  color: black;
  border-color: black;
  margin-top: 80px;
  font-size: 14px;
  cursor: pointer;
  
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  margin-right: 5px;
`;

interface OverlayProps {
  show: boolean
}

const CopiedOverlay = styled.div`
  user-select: none;
  background: rgba(200,200,200, 0.8);
  opacity: ${(props:OverlayProps) => props.show ? '1' : '0'};
  z-index: ${(props:OverlayProps) => props.show ? '1' : '-1'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  
  h1 {
    color: rgba(0,0,0,0.6);
  }
`;

const StyledLink = styled(Link)`
  border: 2px solid ${props => props.theme.black};
  color: ${props => props.theme.black};
  font-weight: bold;
  
  border-radius: 5px;
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  
  &:hover, &:active {
    text-decoration: none;
    
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.lightgray};
  }
`;

interface PropTypes extends RouteComponentProps {
  session: Session;
  recordSession: (session: Session) => void;
  clearSession: () => void;
}


const Summary = ({session, recordSession, clearSession, history}: PropTypes) => {
  const [showCopiedOverlay, setShowCopiedOverlay] = useState(false);
  const htmlParser = new Parser();
  const text = session.text ?? '';
  const viewText = htmlParser.parse(text);
  let textComponent:HTMLDivElement|null;

  const COPY_TEXT_OVERLAY_TIMEOUT = 2000;

  useEffect(()=>{
    // record time
  }, []);

  const saveSession = () => {
    recordSession(session);
    clearSession();
    history.push("/")
  };

  const copyToClipboard = () => {
    if(textComponent!==null) {
      let range = document.createRange();
      range.selectNode(textComponent);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();

      setShowCopiedOverlay(true);
      setTimeout(()=>{
        setShowCopiedOverlay(false);
      },COPY_TEXT_OVERLAY_TIMEOUT)
    }
  };

  let wordCount = countWords(text);

  return (
    <Container>
      <HeaderContainer>
        <Title data-cy={'header'}>Summary</Title>
        <HeaderActions>
          {text === '' ? (
            <HeaderLink to='/'>Cancel</HeaderLink>
          ):(
            <React.Fragment>
              <HeaderLink to='/'>Pause</HeaderLink>
              <HeaderLink to='/compose'>Resume</HeaderLink>
            </React.Fragment>
          )}

        </HeaderActions>
      </HeaderContainer>
      <ViewContainer>

        <Column>
          <TextColumn data-cy={"text-content"} ref={(c) => textComponent = c} onClick={copyToClipboard}>
            {viewText}
          </TextColumn>
          <CopiedOverlay show={showCopiedOverlay}><h1>Copied!</h1></CopiedOverlay>

        </Column>

        <SummaryColumn>
          <ColumnContent>
            {/*<h4>Summary</h4>*/}
            <p>Word Count: <span data-cy={"word-count"}>{wordCount}</span></p>

            <StyledButton onClick={saveSession} data-cy={"session-complete"}>Archive Session</StyledButton>
            {/*<p><Link to={"/"}>Pause</Link></p>*/}
            {/*<p><Link to={"/compose"}>Resume</Link></p>*/}
            {/*<p><Link to={"/edit"}>Edit</Link></p>*/}
          </ColumnContent>
        </SummaryColumn>
      </ViewContainer>
    </Container>
  )
};

export default withRouter(Summary);