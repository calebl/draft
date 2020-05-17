import sessionsReducer from './sessions'
import {
  RECORD_SESSION
} from "../actions/sessions";
import storyReducer from "./session";

const defaultState = {
  sessions: []
};

describe("Sessions reducer", () => {
  it("Returns default state if no known actions are called", () => {
    const result = sessionsReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Adds a session when RECORD_SESSION is called", ()=>{
    const result = sessionsReducer(defaultState, {
      type: RECORD_SESSION,
      session: {
        text: 'new text',
        wordCount: 2,
        time: 4
      }
    });

    expect(result).toHaveProperty("sessions.0.text", 'new text');
    expect(result).toHaveProperty("sessions.0.wordCount", 2);
    expect(result).toHaveProperty("sessions.0.time", 4);
  });
});