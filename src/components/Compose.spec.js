import React from "react";
import Compose from "./Compose";
import { renderWithRouter, click, typeIn} from "../testUtils";

const renderComposeComponent = (overrideProps) => {
  const addToSessionMock = jest.fn();
  const recordSessionMock = jest.fn();
  const component = renderWithRouter(
    <Compose
      addToSession={addToSessionMock}
      recordSession={recordSessionMock}
      text={"initial text"}
      {...overrideProps}
      />
  );
  return {...component, addToSessionMock, recordSessionMock};
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
      addToSessionMock,
      recordSessionMock
    } = renderComposeComponent();

    click(getByTestId('add-button'));

    expect(addToSessionMock).toHaveBeenCalledTimes(1);
  })
})