import Trix from "trix"
import React from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles} from "../elements";
import PropTypes from "prop-types";
import TextEditor from "./TextEditor";

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  max-width: 700px;
  height: 60%;
  
  trix-toolbar {
    opacity: 0;
    transition: all 0.2s;
    
    &:hover {
      opacity: 1;
    }
  }

  trix-editor {
    text-align: left;
    flex: 1;
    height: 100%;
    overflow: auto;
    
    border: 0;
  }
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
  
  border: 0;
`;

const Edit = ({text, updateSession}) => {

  const updateContent = (newContent) => {
    updateSession(newContent);
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Edit</Title>
        <div>
          <HeaderLink to='/compose'>{'Write'}</HeaderLink>
          <HeaderLink to='/summary'>{'View Summary'}</HeaderLink>
        </div>
      </HeaderContainer>

      <Row>
        <EditContainer>
          <TextEditor content={text} textChanged={updateContent}/>
        </EditContainer>
      </Row>

    </Container>
  )
};

Edit.propTypes = {
  updateSession: PropTypes.func,
  text: PropTypes.string
};

export default withRouter(Edit)