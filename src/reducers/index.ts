import { combineReducers } from 'redux';
import session from "./session";
import sessions from "./sessions";
import tutorial from "./tutorial";

const rootReducer = combineReducers({
  session,
  sessions,
  tutorial
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>