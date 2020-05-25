import {connect} from "react-redux";
import {clearSession, updateSession} from "../actions/session";
import {recordSession} from "../actions/sessions";
import Summary from "../components/Summary";
import {RootState} from "../reducers";
import {Dispatch} from "redux";


const mapStateToProps = (state : RootState) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  updateSession: (text : string) => dispatch(updateSession(text)),
  recordSession: (session: Session) => dispatch(recordSession(session)),
  clearSession: ()=>dispatch(clearSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);