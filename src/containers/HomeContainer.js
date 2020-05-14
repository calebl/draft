import {connect} from "react-redux";
import Home from "../components/Home"

export const mapStateToProps = ({text}) => ({
  text
});

export default connect(mapStateToProps)(Home);