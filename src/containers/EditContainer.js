import React from "react"
import {connect} from "react-redux";
import {updateSession} from "../actions/session";
import Edit from "../components/Edit";


const mapStateToProps = ({story}) => ({
  text: story.text
});

const mapDispatchToProps = dispatch => ({
  updateSession: text => dispatch(updateSession(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);