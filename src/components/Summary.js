import React from "react";
import styled from "styled-components";
import {Parser} from "html-to-react";
import {withRouter, Link} from "react-router-dom";
import {Container, HeaderContainer, Title} from "../elements";


const ViewContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  
  flex: 1;
`;

const Column = styled.div`
  flex: 1;
  position: relative;
`;

const ColumnContent = styled.div`
  padding: 20px;
`;

const SummaryColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Summary = ({text}) => {

  const htmlParser = new Parser();
  const viewText = htmlParser.parse(text);

  return (
    <Container>
      <HeaderContainer>
        <Title>Summary</Title>
      </HeaderContainer>
      <ViewContainer>
        <Column>
          <ColumnContent>
            {viewText}
          </ColumnContent>
        </Column>

        <SummaryColumn>
          <ColumnContent>
            <h4>Summary</h4>
            <p>Word Count: 435</p>
            <p>Session Length: 5 min.</p>
          </ColumnContent>
        </SummaryColumn>
      </ViewContainer>
    </Container>
  )
};

export default withRouter(Summary);