import Compose from "../components/Compose";
import {connect} from "react-redux";
import {addToSession} from "../actions/session";
import {recordSession} from "../actions/sessions";

const mapStateToProps = ({story}) => ({
  text: story.text
});

const mapDispatchToProps = dispatch => ({
  addToSession: text => dispatch(addToSession(text)),
  recordSession: session => dispatch(recordSession(session))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
