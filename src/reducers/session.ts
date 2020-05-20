import {ActionType} from "../actions/session";

interface SessionAction extends Session {
  type: ActionType;
}

const initialState : Session = {
  text: '',
  wordCount: 0,
  time: 0
};

const session = (state = initialState, action : SessionAction) => {
  switch (action.type) {
    case ActionType.ADD_TO_SESSION:
      const updatedContent = state.text !== '' ? state.text + "<br/>" + action.text : action.text;
      return Object.assign({}, state, {
        text: updatedContent
      });
    case ActionType.UPDATE_SESSION_TEXT:
      return Object.assign({}, state, {
        text: action.text
      });

    case ActionType.CLEAR_SESSION:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
};

export default session;