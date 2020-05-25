export enum ActionType {
  RECORD_SESSION = 'RECORD_SESSION',
  LOAD_SESSIONS = 'LOAD_SESSIONS'
}

export function recordSession(session : Session){
  return {
    type: ActionType.RECORD_SESSION,
    session
  }
}

export function loadSessions(sessions : Session[]){
  return {
    type: ActionType.LOAD_SESSIONS,
    sessions: sessions
  }
}