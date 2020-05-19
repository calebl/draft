import {connect} from "react-redux";
import Home from "../components/Home"
import {RootState} from "../reducers";

export const mapStateToProps = (state : RootState) => ({
  text: state.session.text
});

export default connect(mapStateToProps)(Home);