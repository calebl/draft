import {
  RECORD_SESSION
} from "../actions/sessions";

const initialState = {
  sessions: []
};

const sessions = (state = initialState, action) => {
  switch(action.type) {
    case RECORD_SESSION:
      return Object.assign({}, state, {
        sessions: [...state.sessions, action.session]
      });
    default:
      return state;
  }
};

export default sessions;