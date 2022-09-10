/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SingleNotebookPage } from "../../src/notebooks/single-notebook-page";

describe("Notebooks page", () => {
  beforeAll(() => {
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
  });
  it("should show notebooks page header", async () => {
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
  it("should show and hide side panel when a note is selected and de-selected", async () => {
    const component = render(
      <BrowserRouter>
        <SingleNotebookPage />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-content-note-2"));
    fireEvent.click(screen.getByTestId("note-content-note-2"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "visible"
    );
    fireEvent.click(screen.getByTestId("single-notebook-page-content-wrapper"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "hidden"
    );

    component.unmount();
  });

  it("should delete a note", async () => {
    const component = render(
      <BrowserRouter>
        <SingleNotebookPage />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-content-note-2"));
    fireEvent.click(screen.getByTestId("note-content-note-2"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "visible"
    );
    await waitFor(() => screen.getByTestId("action-delete-note-note-2"));
    fireEvent.click(screen.getByTestId("action-delete-note-note-2"));
    await waitFor(() =>
      expect(
        screen.getByTestId("single-notebook-page-sidepanel")
      ).not.toHaveClass("visible")
    );
    component.unmount();
  });
});
