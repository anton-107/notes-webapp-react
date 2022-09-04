/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SingleNotebookPage } from "../../src/notebooks/single-notebook-page";

describe("Notebooks page", () => {
  it("should show notebooks page header", async () => {
    fetchMock.mockResponse(async (req) => {
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: [
            {
              content: "Note 1",
              id: "note-1",
            },
            {
              content: "Note 2",
              id: "note-2",
            },
          ],
        });
      } else {
        return JSON.stringify({
          name: "Notebook 1",
          id: "notebook-1",
        });
      }
    });

    const component = render(
      <BrowserRouter>
        <SingleNotebookPage />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-name-header"));
    expect(screen.getByTestId("notebook-name-header")).toHaveTextContent(
      "Notebook 1"
    );
    component.unmount();
  });
});
