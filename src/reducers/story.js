import {
  ADD_TO_STORY,
  UPDATE_STORY_TEXT
} from "../actions/story";

const initialState = {
  text: '',
  previousText: []
};

const story = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_STORY:
      const updatedContent = state.text !== '' ? state.text + "<br/>" + action.text : action.text;
      return Object.assign({}, state, {
        text: updatedContent
      });
    case UPDATE_STORY_TEXT:
      const previousText = state.previousText ?? [];
      return Object.assign({}, state, {
        text: action.text,
        previousText: [...previousText, state.text]
      });
    default:
      return state;
  }
};

export default story;