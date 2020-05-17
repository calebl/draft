export const RECORD_SESSION = 'RECORD_SESSION';

export function recordSession(session){
  return {
    type: RECORD_SESSION,
    session
  }
}