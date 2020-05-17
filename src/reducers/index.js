import { combineReducers } from 'redux';
import story from "./story";
import sessions from "./sessions";

export default combineReducers({
  story,
  sessions
});