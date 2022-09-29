/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  NotebookBoardComponent,
  testingSensor,
} from "../../../src/notebooks/notebook-views/notebook-board.component";

describe("Notebook board component", () => {
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
            {
              content: "Item in a non-existent section",
              id: "non-existent-item-1",
              extensionProperties: { section: "non-existent-section" },
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
  it("should render", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookBoardComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-board-view"));
    // it should render notes even if their section does not exist:
    await waitFor(() => screen.getByTestId("note-content-non-existent-item-1"));
    component.unmount();
  });
  it("should show and hide side panel when a note is selected and de-selected", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookBoardComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-content-note-2"));
    fireEvent.click(screen.getByTestId("note-content-note-2"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "visible"
    );
    fireEvent.click(screen.getByTestId("notebook-board-view"));
    expect(screen.getByTestId("single-notebook-page-sidepanel")).toHaveClass(
      "hidden"
    );

    component.unmount();
  });

  it("should delete a note", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookBoardComponent />
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
  it("should handle drag and drop note", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookBoardComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-content-note-1"));
    testingSensor.moveCard("note-1");
    // there are no expectations in this test, since it is not possible to drop a note in a target section
    component.unmount();
  });
});
