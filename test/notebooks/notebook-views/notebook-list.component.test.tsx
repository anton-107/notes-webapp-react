/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotebookListComponent } from "../../../src/notebooks/notebook-views/notebook-list.component";

describe("Notebook list component", () => {
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
            {
              content: "To do",
              id: "todo-section",
              type: { type: "notes-container" },
            },
            {
              content: "To do item one",
              id: "todo-1",
              extensionProperties: { section: "todo-section" },
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
  it("should show a section", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookListComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("section-todo-section"));
    expect(screen.getByTestId("section-todo-section")).toHaveTextContent(
      "To do"
    );
    component.unmount();
  });
  it("should show and hide side panel when a note is selected and de-selected", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookListComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-content-note-2"));
    fireEvent.click(screen.getByTestId("note-content-note-2"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "visible"
    );
    fireEvent.click(screen.getByTestId("notebook-list-view"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "hidden"
    );

    component.unmount();
  });

  it("should delete a note", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookListComponent />
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
