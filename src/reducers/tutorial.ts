import {ActionType} from "../actions/tutorial";

interface TutorialAction extends Tutorial {
  type: ActionType
}

const initialState : Tutorial = {
  compose: false,
  summary: false,
  sessions: false
};

const tutorial = (state = initialState, action : TutorialAction) => {
  switch (action.type) {
    case ActionType.UPDATE_TUTORIAL:
      return Object.assign({}, state, {
        compose: action.compose,
        summary: action.summary,
        sessions: action.sessions
      });
    default:
      return state;
  }
};

export default tutorial;