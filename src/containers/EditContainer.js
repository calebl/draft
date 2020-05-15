import React from "react"
import {connect} from "react-redux";
import {updateStory} from "../actions/story";
import Edit from "../components/Edit";


const mapStateToProps = ({story}) => ({
  text: story.text
});

const mapDispatchToProps = dispatch => ({
  updateStory: text => dispatch(updateStory(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);