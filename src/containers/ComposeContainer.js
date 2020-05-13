import React, {useState} from 'react';
import Compose from "../components/Compose";
import styled from "styled-components";
import {connect} from "react-redux";
import {addToStory} from "../actions/story";

const Container = styled.div`
`;

const ComposeContainer = props => {
  const {story} = props;

  const addContent = (newContent) => {
    props.addToStory(newContent);
  };

  return (
    <Container>
      <Compose addText={addContent} text={story.text}/>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  story: state.story
});

const mapDispatchToProps = dispatch => ({
  addToStory: text => dispatch(addToStory(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposeContainer);
