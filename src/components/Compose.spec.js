import React from "react";
import Compose from "./Compose";
import { renderWithRouter, click, typeIn} from "../testUtils";

const renderComposeComponent = (overrideProps) => {
  const addToStoryMock = jest.fn();
  const component = renderWithRouter(
    <Compose
      addToStory={addToStoryMock}
      text={"initial text"}
      {...overrideProps}
      />
  );
  return {...component, addToStoryMock};
};

describe("Compose", ()=>{
  it("Should display text", ()=>{
    const {
      getByText
    } = renderComposeComponent({text: "Some Text"});

    expect(getByText(/Some Text/)).not.toBe(null);
  });

  it("Should call add to story when Add is clicked",()=>{
    const {
      getByTestId,
      addToStoryMock
    } = renderComposeComponent();

    click(getByTestId('add-button'));

    expect(addToStoryMock).toHaveBeenCalledTimes(1);
  })
})