export enum ActionType {
  LOAD_SESSION = 'LOAD_SESSION',
  ADD_TO_SESSION = 'ADD_TO_SESSION',
  UPDATE_SESSION_TEXT = 'UPDATE_SESSION',
  CLEAR_SESSION = 'CLEAR_SESSION'
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

export function clearSession(){
  return {
    type: ActionType.CLEAR_SESSION
  }
}

export function loadSession(text : string){
  return {
    type: ActionType.LOAD_SESSION,
    text
  }

}