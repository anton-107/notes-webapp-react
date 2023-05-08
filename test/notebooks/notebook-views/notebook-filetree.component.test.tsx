/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { NotebookFileTreeComponent } from "../../../src/notebooks/notebook-views/notebook-filetree.component";

describe("Notebook file tree component", () => {
  it("should show a stub message until this component is implemented", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookFileTreeComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-filetree-view"));
    expect(screen.getByTestId("notebook-filetree-view")).toHaveTextContent(
      "File tree contents"
    );
    component.unmount();
  });
});
