import storyReducer from './story';
import {
  ADD_TO_STORY,
  UPDATE_STORY_TEXT
} from "../actions/story";

const defaultState = {
  text: '',
  previousText: []
};

describe("Story reducer", ()=> {
  it("Returns default state if no known actions are called", () => {
    const result = storyReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Adds to the story text when ADD_TO_STORY is called", ()=>{
    const result = storyReducer(defaultState, {
      type: ADD_TO_STORY,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'new text');
    expect(result).toHaveProperty("previousText", []);
  });

  it("Add newline when ADD_TO_STORY is called with existing text", () => {
    const result = storyReducer({text: "some text", previousText: []}, {
      type: ADD_TO_STORY,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'some text<br/>new text');
    expect(result).toHaveProperty("previousText", []);
  });

  it("Updates text when UPDATE_STORY_TEXT is called", ()=>{
    const result = storyReducer({text: "some text", previousText: []}, {
      type: UPDATE_STORY_TEXT,
      text: 'new text'
    });

    expect(result).toHaveProperty("text", 'new text');
  })
});