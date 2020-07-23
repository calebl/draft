import {connect} from "react-redux";
import {RootState} from "../reducers";
import Sessions from "../components/Sessions";

const mapStateToProps = (state : RootState) => ({
  sessions: state.sessions.sessions
});

export default connect(mapStateToProps)(Sessions);