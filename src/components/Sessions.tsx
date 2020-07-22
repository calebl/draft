import React from "react";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import styled from "styled-components";
import {Container, HeaderActions, HeaderActionStyles, HeaderContainer, Title} from "../elements";
import {Parser} from "html-to-react";

const SessionRow = styled.div`
  display: flex;
  flex-direction: row;
  background: lightgray;
  margin-bottom: 20px;
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  margin-right: 5px;
`;

const ViewContainer = styled.div`
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  
  flex: 1;
`;

interface PropTypes extends RouteComponentProps {
  sessions : Session[];
}

const Sessions = ({sessions, history} : PropTypes) => {

  let sessionRows = sessions.map(session => {
    const htmlParser = new Parser();
    const text = session.text ?? '';
    const viewText = htmlParser.parse(text);

    return <SessionRow><div>{viewText}</div><div>word count: {session.wordCount}</div></SessionRow>
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
        {sessionRows}
      </ViewContainer>
    </Container>
  )
};

export default withRouter(Sessions);