/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotebookTableComponent } from "../../../src/notebooks/notebook-views/notebook-table.component";

describe("Notebook table component", () => {
  beforeAll(() => {
    fetchMock.mockResponse(async () => {
      return JSON.stringify({
        notes: [
          {
            content: "Note 1",
            id: "note-1",
            extensionProperties: { manualOrder: 100 },
          },
          {
            content: "Note 2",
            id: "note-2",
            extensionProperties: { manualOrder: 200 },
          },
          {
            content: "Note 3",
            id: "note-3",
            extensionProperties: { manualOrder: 300 },
          },
          {
            content: "Note 4",
            id: "note-4",
          },
          {
            content: "Note 5",
            id: "note-5",
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
    });
  });
  it("should render", async () => {
    const component = render(
      <BrowserRouter>
        <NotebookTableComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-table-view"));
    await waitFor(() => screen.getByTestId("note-row-note-1"));
    component.unmount();
  });
});
