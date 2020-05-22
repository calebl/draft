import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";
import {withRouter, Link} from "react-router-dom";
import {countWords} from "../utils/counter";

import {Container, HeaderActionStyles, HeaderContainer, Title} from "../elements";


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
  padding: 20px;
  background-color: #EFEFEF;
  overflow: auto;
  height: 100%;
  text-align: left;
  border-radius: ${props => props.theme.borderRadius};
`;

const SummaryColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  ${HeaderActionStyles}
  
  margin-top: 80px;
  font-size: 14px;
  cursor: pointer;
  
`;



const Summary = ({session, recordSession, clearSession, history}) => {
  const htmlParser = new Parser();
  const viewText = htmlParser.parse(session.text);

  useEffect(()=>{
    // record time
  }, []);

  const saveSession = () => {
    recordSession(session);
  };

  let wordCount = countWords(session.text);

  return (
    <Container>
      <HeaderContainer>
        <Title>Summary</Title>
      </HeaderContainer>
      <ViewContainer>
        <Column>
          <TextColumn>
            {viewText}
          </TextColumn>
        </Column>

        <SummaryColumn>
          <ColumnContent>
            <h4>Summary</h4>
            <p>Word Count: {wordCount}</p>
            {/*<p>Session Length: 5 min.</p>*/}


            <StyledButton onClick={saveSession}>Complete Session</StyledButton>

            <p><Link to={"/compose"}>Write</Link></p>
            <p><Link to={"/edit"}>Edit</Link></p>
          </ColumnContent>
        </SummaryColumn>
      </ViewContainer>
    </Container>
  )
};

export default withRouter(Summary);