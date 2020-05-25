import sessionsReducer from './sessions'
import {
  ActionType,
  recordSession,
  loadSessions
} from "../actions/sessions";

const defaultState = {
  sessions: []
};

describe("Sessions reducer", () => {
  it("Returns default state if no known actions are called", () => {
    const result = sessionsReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Adds a session when RECORD_SESSION is called", ()=>{
    const result = sessionsReducer(defaultState, recordSession({
        text: 'new text',
        wordCount: 2
      })
    );

    expect(result).toHaveProperty("sessions.0.text", 'new text');
    expect(result).toHaveProperty("sessions.0.wordCount", 2);
  });

  it("Loads sessions when LOAD_SESSION is called", ()=>{
    const result = sessionsReducer(defaultState, loadSessions([
      {
        text: 'new text',
        wordCount: 2
      },
      {
        text: 'new text 2',
        wordCount: 3
      }
    ]))

    expect(result).toHaveProperty("sessions.0.text", 'new text');
    expect(result).toHaveProperty("sessions.0.wordCount", 2);

    expect(result).toHaveProperty("sessions.1.text", 'new text 2');
    expect(result).toHaveProperty("sessions.1.wordCount", 3);
  })
});