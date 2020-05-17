import {
  ADD_TO_SESSION,
  UPDATE_SESSION_TEXT
} from "../actions/session";

const initialState = {
  text: '',
  wordCount: 0,
  time: 0
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SESSION:
      const updatedContent = state.text !== '' ? state.text + "<br/>" + action.text : action.text;
      return Object.assign({}, state, {
        text: updatedContent
      });
    case UPDATE_SESSION_TEXT:
      return Object.assign({}, state, {
        text: action.text
      });

    default:
      return state;
  }
};

export default session;