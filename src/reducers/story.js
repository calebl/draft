import {
  ADD_TO_STORY,
  UPDATE_STORY_TEXT
} from "../actions/story";

const initialState = {
  text: ''
};

const story = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_STORY:
      const updatedContent = state.text !== '' ? state.text + "<br/>" + action.text : action.text;
      return Object.assign({}, state, {
        text: updatedContent
      });
    case UPDATE_STORY_TEXT:
      return Object.assign({}, state, {
        text: action.text
      });

    default:
      return state;
  }
};

export default story;