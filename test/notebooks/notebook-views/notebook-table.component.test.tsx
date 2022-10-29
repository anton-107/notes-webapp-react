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

  const mockSupportedColumns = [
    { name: "Due date", columnType: "due-date", valueType: "date" },
    { name: "Start date", columnType: "start-date", valueType: "date" },
    { name: "End date", columnType: "end-date", valueType: "date" },
    { name: "Assignee", columnType: "task-assignee", valueType: "person-id" },
    { name: "Completed", columnType: "task-completed", valueType: "boolean" },
  ];

  it("should show list of notes and columns", async () => {
    fetchMock.mockResponse(async (req) => {
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: mockNotes,
        });
      } else if (req.url.endsWith("/notebook-supported-columns")) {
        return JSON.stringify({
          columns: mockSupportedColumns,
        });
      } else {
        return JSON.stringify({
          tableColumns: [{ name: "Due date", columnType: "due-date" }],
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
      } else if (req.url.endsWith("/notebook-supported-columns")) {
        return JSON.stringify({
          columns: mockSupportedColumns,
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

    await waitFor(() => screen.getByTestId("checkbox-due-date"));
    fireEvent.click(screen.getByTestId("checkbox-due-date"));

    await waitFor(() => screen.getByTestId("save-table-columns-button"));
    fireEvent.click(screen.getByTestId("save-table-columns-button"));
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
      } else if (req.url.endsWith("/notebook-supported-columns")) {
        return JSON.stringify({
          columns: mockSupportedColumns,
        });
      } else {
        return JSON.stringify({
          id: "notebook-1",
          tableColumns: [{ columnType: "due-date", name: "Due date" }],
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

    await waitFor(() =>
      expect(
        screen.getByTestId<HTMLInputElement>("checkbox-due-date").checked
      ).toBe(true)
    );
    await waitFor(() => screen.getByTestId("checkbox-task-completed"));
    fireEvent.click(screen.getByTestId("checkbox-task-completed"));

    await waitFor(() => screen.getByTestId("save-table-columns-button"));
    act(() => {
      fireEvent.click(screen.getByTestId("save-table-columns-button"));
    });
    await waitFor(() => expect(lastRequestBody).not.toBe(undefined));
    if (!lastRequestBody) {
      throw "Expected lastRequestBody to be set";
    }
    console.log("lastRequestBody", lastRequestBody);
    expect(lastRequestBody["table-columns"].length).toBe(2);
    component.unmount();
  });
});
