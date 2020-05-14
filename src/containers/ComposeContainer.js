import Compose from "../components/Compose";
import {connect} from "react-redux";
import {addToStory} from "../actions/story";

const mapStateToProps = ({story}) => ({
  text: story.text
});

const mapDispatchToProps = dispatch => ({
  addToStory: text => dispatch(addToStory(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Compose);
