import Trix from "trix"
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";
import {Container, HeaderContainer} from "../elements";
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
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: 0;
  background: grey;
  color: white;
  padding: 10px 20px;
  font-family: karla;
  width: 100px;
  border-radius: 3px;

  :active {
    background: white;
    color: grey;
    border: 1px solid gray;
  }
  
  :focus {
    outline: none;
  }
`;

const Edit = ({text, updateStory: updateSession, history}) => {
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
        <h3>Edit</h3>
        <Link to='/'>{'Done'}</Link>
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