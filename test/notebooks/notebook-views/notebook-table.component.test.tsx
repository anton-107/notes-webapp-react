/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotebookTableComponent } from "../../../src/notebooks/notebook-views/notebook-table.component";

describe("Notebook table component", () => {
  const mockNotes = [
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
  ];

  it("should show list of notes and columns", async () => {
    fetchMock.mockResponse(async (req) => {

      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: mockNotes,
        });
      } else {
        return JSON.stringify({
          tableColumns: [{name: "Due date", columnType: "due-date"}]
        });
      }
    });
    const component = render(
      <BrowserRouter>
        <NotebookTableComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-table-view"));
    await waitFor(() => screen.getByTestId("note-row-note-1"));
    await waitFor(() => screen.getByTestId("dynamic-column-header-due-date"));
    component.unmount();
  });
  it("should add a new column to the table view of the notebook when no columns are set in the notebook", async () => {
    let lastRequestBody: { "table-columns": Record<string, unknown>[] };
    fetchMock.mockResponse(async (req) => {
      if (req.method === "POST") {
        lastRequestBody = await req.json();
      }
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: mockNotes,
        });
      } else {
        return JSON.stringify({
          id: "notebook-1",
        });
      }
    });
    const component = render(
      <BrowserRouter>
        <NotebookTableComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-table-view"));
    await waitFor(() => screen.getByTestId("note-row-note-1"));
    await waitFor(() => screen.getByTestId("add-table-column-link"));
    fireEvent.click(screen.getByTestId("add-table-column-link"));
    await waitFor(() => screen.getByTestId("add-table-column-button"));
    fireEvent.click(screen.getByTestId("add-table-column-button"));
    await waitFor(() => expect(lastRequestBody).not.toBe(undefined));
    if (!lastRequestBody) {
      throw "Expected lastRequestBody to be set";
    }
    expect(lastRequestBody["table-columns"].length).toBe(1);
    component.unmount();
  });
  it("should add a new column to the table view of the notebook when there are some columns set in the notebook", async () => {
    let lastRequestBody: { "table-columns": Record<string, unknown>[] };
    fetchMock.mockResponse(async (req) => {
      if (req.method === "POST") {
        lastRequestBody = await req.json();
      }
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: mockNotes,
        });
      } else {
        return JSON.stringify({
          id: "notebook-1",
          tableColumns: [{ id: "column-1", name: "Column 1" }],
        });
      }
    });
    const component = render(
      <BrowserRouter>
        <NotebookTableComponent />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-table-view"));
    await waitFor(() => screen.getByTestId("note-row-note-1"));
    await waitFor(() => screen.getByTestId("add-table-column-link"));

    act(() => {
      fireEvent.click(screen.getByTestId("add-table-column-link"));
    });
    await waitFor(() => screen.getByTestId("add-table-column-button"));
    act(() => {
      fireEvent.click(screen.getByTestId("add-table-column-button"));
    });
    await waitFor(() => expect(lastRequestBody).not.toBe(undefined));
    if (!lastRequestBody) {
      throw "Expected lastRequestBody to be set";
    }
    expect(lastRequestBody["table-columns"].length).toBe(2);
    component.unmount();
  });
});
