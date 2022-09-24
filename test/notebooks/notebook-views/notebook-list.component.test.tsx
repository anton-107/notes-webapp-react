/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { NotebookListComponent } from "../../../src/notebooks/notebook-views/notebook-list.component";

describe("Notebook list component", () => {
  it("should render", async () => {
    const component = render(<NotebookListComponent />);
    await waitFor(() => screen.getByTestId("notebook-list-view"));
    component.unmount();
  });
});
