export enum ActionType {
  ADD_TO_SESSION = 'ADD_TO_SESSION',
  UPDATE_SESSION_TEXT = 'UPDATE_SESSION'
}

export function addToSession(text : string){
  return {
    type: ActionType.ADD_TO_SESSION,
    text
  };
}

export function updateSession(text : string){
  return {
    type: ActionType.UPDATE_SESSION_TEXT,
    text
  }
}