import React from "react";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";

export const renderWithRouter = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

export const click = (element) => fireEvent.click(element);

export const typeIn = (selector, value) =>
  fireEvent.change(selector, {
    target: { value },
  });
