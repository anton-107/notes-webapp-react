/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor, screen } from "@testing-library/react";
import * as React from "react";
import { NotebookBoardComponent } from "../../../src/notebooks/notebook-views/notebook-board.component";

describe("Notebook board component", () => {
  it("should render", async () => {
    const component = render(<NotebookBoardComponent />);
    await waitFor(() => screen.getByTestId("notebook-board-view"));
    component.unmount();
  });
});
