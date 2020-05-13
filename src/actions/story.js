export const ADD_TO_STORY = 'ADD_TO_STORY';

export function addToStory(text){
  return {
    type: ADD_TO_STORY,
    text
  };
}