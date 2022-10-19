/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotebookTableComponent } from "../../../src/notebooks/notebook-views/notebook-table.component";

describe("Notebook table component", () => {
  it("should render", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookTableComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-table-view"));
    component.unmount();
  });
});
