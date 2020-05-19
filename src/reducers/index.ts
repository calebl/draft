import { combineReducers } from 'redux';
import session from "./session";
import sessions from "./sessions";

const rootReducer = combineReducers({
  session,
  sessions
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>