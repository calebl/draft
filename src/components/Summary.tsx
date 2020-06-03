import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import {countWords} from "../utils/counter";
import CopyToClipboard from 'react-copy-to-clipboard';

import {Container, HeaderActionStyles} from "../elements";

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
`;

const StyledButton = styled.button`
  ${HeaderActionStyles}
  
  margin-top: 80px;
  font-size: 14px;
  cursor: pointer;
  
`;

interface PropTypes extends RouteComponentProps {
  session: Session;
  recordSession: (session: Session) => void;
  clearSession: () => void;
}


const Summary = ({session, recordSession, clearSession, history}: PropTypes) => {
  const htmlParser = new Parser();
  const text = session.text ?? '';
  const viewText = htmlParser.parse(text);
  let textComponent = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    // record time
  }, []);

  const saveSession = () => {
    recordSession(session);
    clearSession();
    history.push("/")
  };

  let wordCount = countWords(text);

  debugger

  return (
    <Container>
      <ViewContainer>
        <Column>
          <CopyToClipboard text={viewText} onCopy={() => console.log("copied")} >
            <TextColumn>
              {viewText}
            </TextColumn>
          </CopyToClipboard>
        </Column>

        <SummaryColumn>
          <ColumnContent>
            <h4>Summary</h4>
            <p>Word Count: {wordCount}</p>

            <StyledButton onClick={saveSession}>Complete Session</StyledButton>
            <p><Link to={"/"}>Pause</Link></p>
            <p><Link to={"/compose"}>Resume</Link></p>
            {/*<p><Link to={"/edit"}>Edit</Link></p>*/}
          </ColumnContent>
        </SummaryColumn>
      </ViewContainer>
    </Container>
  )
};

export default withRouter(Summary);