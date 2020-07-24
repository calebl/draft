import Compose from "../components/Compose";
import {connect} from "react-redux";
import {addToSession, addToTyping} from "../actions/session";
import {recordSession} from "../actions/sessions";
import {RootState} from "../reducers";
import {Dispatch} from "redux";

const mapStateToProps = (state : RootState) => ({
  text: state.session.text,
  typing: state.session.typing ?? ''
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  setTyping: (typing : string) => dispatch(addToTyping(typing)),
  addToSession: (text : string) => dispatch(addToSession(text)),
  recordSession: (session : Session) => dispatch(recordSession(session))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
