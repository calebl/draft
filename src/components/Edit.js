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

  trix-editor {
    text-align: left;
    flex: 1;
    height: 100%;
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

  :active {
    background: white;
    color: grey;
    border: 1px solid gray;
  }
  
  :focus {
    outline: none;
  }
`;

const Edit = ({text, updateStory, history}) => {
  const trixInput = React.createRef();
  const [content, setContent] = useState('');

  useEffect(()=> {
    setContent(text);
    trixInput.current.editor.loadHTML(text);

    trixInput.current.addEventListener("trix-change", event => {
      setContent(event.target.innerHTML);
    });
  }, []);

  const updateText = ()=>{
    updateStory(content);
  };

  return (
    <Container>
      <HeaderContainer>
        <h3>Edit</h3>
        <Link to='/'>{'Done'}</Link>
        <Link to='/compose'>{'Write'}</Link>
      </HeaderContainer>

      <EditContainer>
        <input type={"hidden"} id={"trix"} value={content}/>
        <trix-editor input="trix" ref={trixInput} />
      </EditContainer>
      <SaveButton onClick={updateText}>Save</SaveButton>

    </Container>
  )
};

Edit.propTypes = {
  updateStory: PropTypes.func,
  text: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withRouter(Edit)