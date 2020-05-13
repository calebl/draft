import storyReducer from './story';
import {
  ADD_TO_STORY
} from "../actions/story";

const defaultState = {
  text: ''
}

describe("Story reducer", ()=> {
  it("Returns default state if no known actions are called", () => {
    const result = storyReducer(defaultState, { type: "UNKNOWN_ACTION" });
    expect(result).toBe(defaultState);
  });

  it("Adds to the story text with ADD_TO_STORY is called", ()=>{

  });
});