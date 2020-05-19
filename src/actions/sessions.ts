export enum ActionType {
  RECORD_SESSION = 'RECORD_SESSION'
}

export function recordSession(session : Session){
  return {
    type: ActionType.RECORD_SESSION,
    session
  }
}