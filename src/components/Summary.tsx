import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {countWords} from "../utils/counter";

import {Container, HeaderActions, HeaderActionStyles, HeaderContainer, Title} from "../elements";
import TextView from "./TextView";

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

interface PropTypes extends RouteComponentProps {
  session: Session;
  recordSession: (session: Session) => void;
  clearSession: () => void;
}


const Summary = ({session, recordSession, clearSession, history}: PropTypes) => {
  const text = session.text ?? '';
  let wordCount = countWords(text);

  useEffect(()=>{
    // record time
  }, []);

  const saveSession = () => {
    recordSession(session);
    clearSession();
    history.push("/")
  };


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
          <TextColumn>
            <TextView text={text}/>
          </TextColumn>
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