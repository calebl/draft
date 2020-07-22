import {connect} from "react-redux";
import {RootState} from "../reducers";
import Sessions from "../components/Sessions";
import {Dispatch} from "redux";

const mapStateToProps = (state : RootState) => ({
  sessions: state.sessions.sessions
});

export default connect(mapStateToProps)(Sessions);