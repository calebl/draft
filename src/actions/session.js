export const ADD_TO_SESSION = 'ADD_TO_SESSION';
export const UPDATE_SESSION_TEXT = 'UPDATE_SESSION';

export function addToSession(text){
  return {
    type: ADD_TO_SESSION,
    text
  };
}

export function updateSession(text){
  return {
    type: UPDATE_SESSION_TEXT,
    text
  }
}