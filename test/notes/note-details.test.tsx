/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NoteDetails } from "../../src/notes/note-details";
import { EditNoteRequest, Note } from "../../src/notes/notes-service";
import fetchMock from "jest-fetch-mock";

describe("Notes details component", () => {
  it("should display 'more actions' menu", () => {
    const onNoteDeletedMock = jest.fn();
    const onNoteEditedMock = jest.fn();
    const note: Note = {
      id: "note-1",
      content: "This is a test note",
      type: { type: "note" },
      notebook: { id: "notebook-1" },
      section: null,
    };

    const component = render(
      <BrowserRouter>
        <NoteDetails
          note={note}
          onNoteDeleted={onNoteDeletedMock}
          onNoteEdited={onNoteEditedMock}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("more-actions-menu-button"));
    expect(screen.getByTestId("more-actions-dropdown-menu")).toHaveClass(
      "open"
    );

    component.unmount();
  });
  it("should edit note content", async () => {
    fetchMock.mockResponse(async (req) => {
      const requestBody: EditNoteRequest = await req.json();
      return JSON.stringify({
        id: requestBody["note-id"],
        content: requestBody["note-content"],
      });
    });
    const onNoteDeletedMock = jest.fn();
    const onNoteEditedMock = jest.fn();
    const note: Note = {
      id: "note-1",
      content: "This is a test note",
      type: { type: "note" },
      notebook: { id: "notebook-1" },
      section: null,
    };

    const component = render(
      <BrowserRouter>
        <NoteDetails
          note={note}
          onNoteDeleted={onNoteDeletedMock}
          onNoteEdited={onNoteEditedMock}
        />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByTestId("note-details-content-edit-input"), {
      target: { value: "This is an edited note" },
    });
    fireEvent.keyPress(screen.getByTestId("note-details-content-edit-input"), {
      code: "LeftArrow",
      key: "LeftArrow",
      charCode: 37,
    }); // has no effect
    fireEvent.keyPress(screen.getByTestId("note-details-content-edit-input"), {
      code: "Enter",
      key: "Enter",
      charCode: 13,
      target: { value: "This is an edited note" },
    });
    expect(screen.getByTestId("note-details-content-edit-input")).toHaveValue(
      "This is an edited note"
    );
    await waitFor(() =>
      expect(onNoteEditedMock).toBeCalledWith({
        content: "This is an edited note",
        id: "note-1",
      })
    );
    component.unmount();
  });
});
