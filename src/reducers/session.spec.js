import sessionReducer from './session';
import {
  addToSession,
  addToTyping,
  updateSession,
  clearSession,
  loadSession
} from "../actions/session";

const defaultState = {
  text: '',
  typing: ''
};

describe("Session reducer", ()=> {
  it("Returns default state if no known actions are called", () => {
    const result = sessionReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Updates typing when ADD_TO_TYPING is called", ()=>{
    const result = sessionReducer(defaultState, addToTyping('here is some text'));
    expect(result).toHaveProperty('typing', 'here is some text');
  })

  it("Adds to the story text when ADD_TO_STORY is called", ()=>{
    const result = sessionReducer(defaultState, addToSession('new text'));

    expect(result).toHaveProperty("text", 'new text');
  });

  it("Add newline when ADD_TO_STORY is called with existing text", () => {
    const result = sessionReducer({text: "some text"}, addToSession('new text'));

    expect(result).toHaveProperty("text", 'some text<br/>new text');
  });

  it("Updates text when UPDATE_STORY_TEXT is called", ()=>{
    const result = sessionReducer({text: "some text"}, updateSession('new text'));

    expect(result).toHaveProperty("text", 'new text');
  })

  it("Clears the session when CLEAR_SESSION is called", ()=>{
    const result = sessionReducer({text: 'some text'}, clearSession());

    expect(result).toHaveProperty('text', '');
  });

  it("Loads a new session when LOAD_SESSION is called", ()=>{
    const result = sessionReducer({text: 'initial text'}, loadSession('loaded text'));

    expect(result).toHaveProperty('text', 'loaded text')
  });

});