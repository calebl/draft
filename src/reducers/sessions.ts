import {ActionType} from "../actions/sessions";

interface SessionsAction{
  type: ActionType;
  session?: Session;
  sessions?: Session[];
}

interface StateType {
  sessions: Session[]
}

const initialState : StateType = {
  sessions: []
};

const sessions = (state = initialState, action : SessionsAction) => {
  switch(action.type) {
    case ActionType.RECORD_SESSION:
      return Object.assign({}, state, {
        sessions: [...state.sessions, action.session]
      });

    case ActionType.LOAD_SESSIONS:
      return Object.assign({}, state, {
        sessions: action.sessions
      })
    default:
      return state;
  }
};

export default sessions;