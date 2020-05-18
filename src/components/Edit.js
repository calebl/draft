import Trix from "trix"
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import {Container, HeaderContainer, Title, HeaderActionStyles, ButtonStyles} from "../elements";
import PropTypes from "prop-types";

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

const Edit = ({text, updateSession, history}) => {
  const trixInput = React.createRef();
  const [content, setContent] = useState('');
  const [saveText, setSaveText] = useState('Save');

  useEffect(()=> {
    setContent(text);
    trixInput.current.editor.loadHTML(text);

    trixInput.current.addEventListener("trix-change", event => {
      setContent(event.target.innerHTML);
    });
  }, []);

  const updateText = ()=>{
    updateSession(content);
    setSaveText("Saved!");
    setTimeout(()=>{
      setSaveText('Save')
    }, 1000);
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Edit</Title>
        <HeaderLink to='/'>{'Complete Session'}</HeaderLink>
      </HeaderContainer>

      <EditContainer>
        <input type={"hidden"} id={"trix"} value={content}/>
        <trix-editor input="trix" ref={trixInput} />
      </EditContainer>
      <SaveButton onClick={updateText}>{saveText}</SaveButton>

    </Container>
  )
};

Edit.propTypes = {
  updateSession: PropTypes.func,
  text: PropTypes.string
};

export default withRouter(Edit)