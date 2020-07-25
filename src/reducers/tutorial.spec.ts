import tutorialReducer from "./tutorial";
import {
  updateTutorial
} from "../actions/tutorial";

const defaultState : Tutorial = {
  compose: false,
  summary: false,
  sessions: false
};

describe("Tutorial reducer", () => {
  it("Returns default state if unknown action is called", () => {
    // @ts-ignore
    const result = tutorialReducer(defaultState, {type: "Unknown Action"});
    expect(result).toBe(defaultState);
  })

  it("Updates to set the Compose tutorial as viewed", () => {
    const newState = Object.assign({}, defaultState, {
      compose: true
    });
    const result = tutorialReducer(defaultState, updateTutorial(newState));

    expect(result).toStrictEqual({
      compose: true,
      summary: false,
      sessions: false
    })
  })
});