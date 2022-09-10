/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotesList } from "../../src/notes/notes-list";
import fetchMock from "jest-fetch-mock";

describe("Notes list component", () => {
  it("should show list of notes", async () => {
    const noteDeletedMock = jest.fn();
    const noteSelectedMock = jest.fn();
    const notes = [
      {
        content: "Note 1",
        id: "note-1",
      },
      {
        content: "Note 2",
        id: "note-2",
      },
    ];

    const component = render(
      <BrowserRouter>
        <NotesList
          notes={notes}
          onNoteDeleted={noteDeletedMock}
          onNoteSelected={noteSelectedMock}
        />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("note-note-2"));
    expect(screen.getByTestId("note-note-2")).toHaveTextContent("Note 2");
    component.unmount();
  });
  it("should delete a note", async () => {
    fetchMock.mockResponse(`{}`);
    const noteDeletedMock = jest.fn();
    const noteSelectedMock = jest.fn();
    const notes = [
      {
        content: "Note 1",
        id: "note-1",
      },
      {
        content: "Note 2",
        id: "note-2",
      },
    ];

    const component = render(
      <BrowserRouter>
        <NotesList
          notes={notes}
          onNoteDeleted={noteDeletedMock}
          onNoteSelected={noteSelectedMock}
        />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("delete-note-link-note-2"));
    fireEvent.click(screen.getByTestId("delete-note-link-note-2"));
    await waitFor(() => expect(noteDeletedMock).toBeCalled());
    component.unmount();
  });
});
