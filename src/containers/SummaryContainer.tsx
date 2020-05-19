import React from "react"
import {connect} from "react-redux";
import {updateSession} from "../actions/session";
import {recordSession} from "../actions/sessions";
import Summary from "../components/Summary";
import {RootState} from "../reducers";
import {Dispatch} from "redux";


const mapStateToProps = (state : RootState) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  updateSession: (text : string) => dispatch(updateSession(text)),
  recordSession: (session: Session) => dispatch(recordSession(session))
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);