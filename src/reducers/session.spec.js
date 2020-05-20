import sessionReducer from './session';
import {
  ActionType
} from "../actions/session";

const defaultState = {
  text: '',
  wordCount: 0,
  time: 0
};

describe("Story reducer", ()=> {
  it("Returns default state if no known actions are called", () => {
    const result = sessionReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Adds to the story text when ADD_TO_STORY is called", ()=>{
    const result = sessionReducer(defaultState, {
      type: ActionType.ADD_TO_SESSION,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'new text');
  });

  it("Add newline when ADD_TO_STORY is called with existing text", () => {
    const result = sessionReducer({text: "some text"}, {
      type: ActionType.ADD_TO_SESSION,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'some text<br/>new text');
  });

  it("Updates text when UPDATE_STORY_TEXT is called", ()=>{
    const result = sessionReducer({text: "some text"}, {
      type:ActionType.UPDATE_SESSION_TEXT,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'new text');
  })

  it("Clears the session when CLEAR_SESSION is called", ()=>{
    const result = sessionReducer({text: 'some text', wordCount: 100, time: 100}, {
      type: ActionType.CLEAR_SESSION
    });

    expect(result).toHaveProperty('text', '');
    expect(result).toHaveProperty('wordCount', 0);
    expect(result).toHaveProperty('time', 0)
  })

});