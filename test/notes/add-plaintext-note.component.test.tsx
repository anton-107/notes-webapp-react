/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { AddPlaintextNoteComponent } from "../../src/notes/add-plaintext-note.component";

jest.mock("./../../src/environment.ts");

describe("Add plain text note component", () => {
  it("should submit form for note creation", async () => {
    fetchMock.mockResponse(`{ "id": "test-note-id" }`);
    const onNoteAddedMock = jest.fn();

    const component = render(
      <BrowserRouter>
        <AddPlaintextNoteComponent
          notebookID="notebook-1"
          newNoteManualOrder={100}
          sectionID={null}
          onNoteAdded={onNoteAddedMock}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-note-button"));
    fireEvent.blur(screen.getByTestId("add-plaintext-note-textarea"));
    fireEvent.click(screen.getByTestId("add-note-button"));
    fireEvent.change(screen.getByTestId("add-plaintext-note-textarea"), {
      target: { value: "my note" },
    });
    fireEvent.keyDown(screen.getByTestId("add-plaintext-note-textarea"), {
      code: "Enter",
      shiftKey: true,
    }); // should not trigger "add" twice
    fireEvent.keyDown(screen.getByTestId("add-plaintext-note-textarea"), {
      code: "Enter",
    });
    await waitFor(() => expect(onNoteAddedMock).toHaveBeenCalledTimes(1));
    component.unmount();
  });
});
