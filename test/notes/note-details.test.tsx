/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { NoteDetails } from "../../src/notes/note-details";

describe("Notes details component", () => {
  it("should display 'more actions' menu", () => {
    const onNoteDeletedMock = jest.fn();
    const note = {
      id: "note-1",
      content: "This is a test note",
    };

    const component = render(
      <BrowserRouter>
        <NoteDetails note={note} onNoteDeleted={onNoteDeletedMock} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("more-actions-menu-button"));
    expect(screen.getByTestId("more-actions-dropdown-menu")).toHaveClass(
      "open"
    );

    component.unmount();
  });
});
