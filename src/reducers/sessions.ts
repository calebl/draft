import {
  ActionType
} from "../actions/sessions";

interface SessionsAction {
  type: ActionType;
  session: Session;
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
    default:
      return state;
  }
};

export default sessions;