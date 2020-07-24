import {connect} from "react-redux";
import Home from "../components/Home"
import {RootState} from "../reducers";

export const mapStateToProps = (state : RootState) => ({
  text: state.session.text,
  typing: state.session.typing,
  sessions: state.sessions.sessions
});

export default connect(mapStateToProps)(Home);