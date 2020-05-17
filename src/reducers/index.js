import { combineReducers } from 'redux';
import session from "./session";
import sessions from "./sessions";

export default combineReducers({
  story: session,
  sessions
});