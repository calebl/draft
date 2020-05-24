import {connect} from "react-redux";
import {updateSession} from "../actions/session";
import Edit from "../components/Edit";
import {RootState} from "../reducers";
import {Dispatch} from "redux";


const mapStateToProps = (state: RootState) => ({
  text: state.session.text
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
  updateSession: (text : string) => dispatch(updateSession(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);