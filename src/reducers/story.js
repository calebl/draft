import {
  ADD_TO_STORY
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
    default:
      return state;
  }
};

export default story;