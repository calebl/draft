import React from "react"
import {addToStory} from "../actions/story";



const EditContainer = props => {
  return (
    <div>
      <h1>Editing</h1>
    </div>
  )
};

const mapStateToProps = (state) => ({
  story: state.story
});

const mapDispatchToProps = dispatch => ({
  addToStory: text => dispatch(addToStory(text))
});

export default EditContainer;