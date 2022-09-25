/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotesList } from "../../src/notes/notes-list";
import { Note } from "../../src/notes/notes-service";

describe("Notes list component", () => {
  it("should show list of notes", async () => {
    const noteSelectedMock = jest.fn();
    const notes: Note[] = [
      {
        content: "Note 1",
        id: "note-1",
        type: { type: "note" },
        notebookID: "notebook-1",
        extensionProperties: { section: null },
      },
      {
        content: "Note 2",
        id: "note-2",
        type: { type: "note" },
        notebookID: "notebook-1",
        extensionProperties: { section: null },
      },
    ];

    const component = render(
      <BrowserRouter>
        <NotesList notes={notes} onNoteSelected={noteSelectedMock} />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-note-2"));
    expect(screen.getByTestId("note-note-2")).toHaveTextContent("Note 2");
    component.unmount();
  });
});
