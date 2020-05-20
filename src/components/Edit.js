import Trix from "trix"
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles, ButtonStyles} from "../elements";
import PropTypes from "prop-types";
import TextEditor from "./TextEditor";

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  trix-editor {
    text-align: left;
    flex: 1;
    height: 100%;
    overflow: auto;
  }
`;

const SaveButton = styled.button`
  ${ButtonStyles}
  
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 80px;
`;

const HeaderLink = styled(Link)`
  ${HeaderActionStyles}
`;

const Edit = ({text, updateSession}) => {
  const [content, setContent] = useState(text);
  const [saveText, setSaveText] = useState('Save');

  const saveUpdates = ()=>{
    updateSession(content);

    setSaveText("Saved!");
    setTimeout(()=>{
      setSaveText('Save')
    }, 1000);
  };

  const updateContent = (newContent) => {
    setContent(newContent)
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Edit</Title>
        <HeaderLink to='/summary'>{'View Summary'}</HeaderLink>
      </HeaderContainer>

      <EditContainer>
        <TextEditor content={content} textChanged={updateContent} />
      </EditContainer>
      <SaveButton onClick={saveUpdates}>{saveText}</SaveButton>

    </Container>
  )
};

Edit.propTypes = {
  updateSession: PropTypes.func,
  text: PropTypes.string
};

export default withRouter(Edit)