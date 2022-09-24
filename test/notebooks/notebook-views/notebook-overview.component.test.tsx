/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { NotebookOverviewComponent } from "../../../src/notebooks/notebook-views/notebook-overview.component";

describe("Notebook overview component", () => {
  it("should render", async () => {
    const component = render(<NotebookOverviewComponent />);
    await waitFor(() => screen.getByTestId("notebook-overview-view"));
    component.unmount();
  });
});
