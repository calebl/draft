import {ActionType} from "../actions/session";

interface SessionAction extends Session {
  type: ActionType;
}

const initialState : Session = {
  text: '',
  typing: ''
};

const session = (state = initialState, action : SessionAction) => {
  switch (action.type) {
    case ActionType.ADD_TO_SESSION:
      const updatedContent = state.text !== '' ? state.text + "<br/>" + action.text : action.text;
      return Object.assign({}, state, {
        text: updatedContent
      });

    case ActionType.ADD_TO_TYPING:
      return Object.assign({}, state, {
        typing: action.typing
      });

    case ActionType.UPDATE_SESSION_TEXT:
      return Object.assign({}, state, {
        text: action.text
      });

    case ActionType.CLEAR_SESSION:
      return Object.assign({}, state, initialState);

    case ActionType.LOAD_SESSION:
      return Object.assign({}, state, {
        text: action.text,
        typing: ''
      });

    default:
      return state;
  }
};

export default session;