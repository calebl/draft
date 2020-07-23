import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import styled from "styled-components";
import {Container, HeaderActions, HeaderActionStyles, HeaderContainer, Title} from "../elements";
import {Parser} from "html-to-react";
import {countWords} from "../utils/counter";
import TextView from "./TextView";

const SessionRow = styled.div`
  min-width: 400px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;

const SessionRowHeader = styled.div`
  
`;

const SessionRowContent = styled.div`
  display: flex;
  flex-direction: row;
  background: lightgray;
  padding: 10px;
  position: relative;
  flex: 1;
  overflow: auto;
`;

const TextColumn = styled.div`
  background: lightgray;
  overflow: auto;
  width: 100%;
`;

const WordCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 14px;
  color: gray;
`

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  margin-right: 5px;
`;

const ViewContainer = styled.div`
  position: relative; 
  padding: 20px;
  overflow: hidden;
`;

const ViewContent = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  
  flex: 1;
`;

interface PropTypes extends RouteComponentProps {
  sessions: Session[];
}

const Sessions = ({sessions, history}: PropTypes) => {

  let totalWords = 0;
  let sessionRows = sessions.map((session, index) => {
    const text = session.text ?? '';
    const wordCount = countWords(text);
    totalWords += wordCount;

    return (
      <SessionRow>
        <SessionRowHeader>{`Session ${index}`}</SessionRowHeader>
        <SessionRowContent>
          <TextColumn>
            <TextView text={text}/>
          </TextColumn>
          <WordCount>{`${wordCount} words`}</WordCount>
        </SessionRowContent>

      </SessionRow>
    )
  });



  return (
    <Container>
        <HeaderContainer>
          <Title data-cy={'header'}>Session Archive</Title>
          <HeaderActions>
            <HeaderLink to='/'>Home</HeaderLink>
          </HeaderActions>
        </HeaderContainer>
        <ViewContainer>
          <ViewContent className={"container-content"}>
            {sessionRows.reverse()}
          </ViewContent>
        </ViewContainer>
    </Container>
  )
};

export default withRouter(Sessions);