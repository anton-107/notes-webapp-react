/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AddSectionComponent } from "../../src/notes/add-section.component";

describe("Add section component", () => {
  it("should submit form for section creation", async () => {
    fetchMock.mockResponse(`{ "id": "test-section-id" }`);
    const onSectionAddedMock = jest.fn();
    const component = render(
      <BrowserRouter>
        <AddSectionComponent
          notebookID="notebook-1"
          onSectionAdded={onSectionAddedMock}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-section-button"));
    fireEvent.change(screen.getByTestId("new-section-name-input"), {
      target: { value: "To do" },
    });
    fireEvent.keyDown(screen.getByTestId("new-section-name-input"), {
      code: "Space",
    }); // does not trigger form submit
    fireEvent.keyDown(screen.getByTestId("new-section-name-input"), {
      code: "Enter",
    });
    await waitFor(() => expect(onSectionAddedMock).toHaveBeenCalledTimes(1));
    component.unmount();
  });
});
