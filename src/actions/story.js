export const ADD_TO_STORY = 'ADD_TO_STORY';
export const UPDATE_STORY_TEXT = 'UPDATE_STORY';

export function addToStory(text){
  return {
    type: ADD_TO_STORY,
    text
  };
}

export function updateStory(text){
  return {
    type: UPDATE_STORY_TEXT,
    text
  }
}