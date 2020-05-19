import Compose from "../components/Compose";
import {connect} from "react-redux";
import {addToSession} from "../actions/session";
import {recordSession} from "../actions/sessions";
import {RootState} from "../reducers";
import {Dispatch} from "redux";

const mapStateToProps = (state : RootState) => ({
  text: state.session.text
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  addToSession: (text : string) => dispatch(addToSession(text)),
  recordSession: (session : Session) => dispatch(recordSession(session))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
