/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NotesList } from "../../src/notes/notes-list";

describe("Notes list component", () => {
  it("should show list of notes", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
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
      })
    );

    const component = render(
      <BrowserRouter>
        <NotesList notebookID="notebook-1" />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-note-2"));
    expect(screen.getByTestId("note-note-2")).toHaveTextContent("Note 2");
    component.unmount();
  });
});
