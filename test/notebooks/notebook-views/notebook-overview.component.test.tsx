/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";

import { NotebookOverviewComponent } from "../../../src/notebooks/notebook-views/notebook-overview.component";

describe("Notebook overview component", () => {
  beforeAll(() => {
    fetchMock.mockResponse(async () => {
      return JSON.stringify({
        name: "Notebook 1",
        id: "notebook-1",
        createdAt: "2020-11-07T18:51",
        updatedAt: "2020-11-07T18:52",
      });
    });
  });
  it("should show notebook information", async () => {
    const component = render(<NotebookOverviewComponent />);
    await waitFor(() => screen.getByTestId("notebook-overview-view"));
    await waitFor(() => screen.getByTestId("notebook-info-createdat"));
    expect(screen.getByTestId("notebook-info-createdat")).toHaveTextContent(
      "This notebook was created at: 2020-11-07T18:51"
    );
    expect(screen.getByTestId("notebook-info-updatedat")).toHaveTextContent(
      "This notebook was last updated at: 2020-11-07T18:52"
    );
    component.unmount();
  });
});
