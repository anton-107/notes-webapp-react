/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { AddNotebookComponent } from "../../src/notebooks/add-notebook.component";

describe("Add notebook component", () => {
  it("should submit form for notebook creation by hitting Enter on the keyboard", async () => {
    fetchMock.mockResponse(`{ "id": "test-notebook-id" }`);
    const onNotebookAddedMock = jest.fn();

    const component = render(
      <BrowserRouter>
        <AddNotebookComponent onNotebookAdded={onNotebookAddedMock} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-notebook-button"));
    fireEvent.blur(screen.getByTestId("add-notebook-input"));
    fireEvent.click(screen.getByTestId("add-notebook-button"));
    fireEvent.change(screen.getByTestId("add-notebook-input"), {
      target: { value: "my notes" },
    });
    fireEvent.keyDown(screen.getByTestId("add-notebook-input"), {
      code: "Enter",
      shiftKey: true,
    }); // should not trigger "add" twice
    fireEvent.keyDown(screen.getByTestId("add-notebook-input"), {
      code: "Enter",
    });
    await waitFor(() => expect(onNotebookAddedMock).toHaveBeenCalledTimes(1));
    component.unmount();
  });
  it("should submit request for notebook creation by submitting the form", async () => {
    fetchMock.mockResponse(`{ "id": "test-notebook-id" }`);
    const onNotebookAddedMock = jest.fn();

    const component = render(
      <BrowserRouter>
        <AddNotebookComponent onNotebookAdded={onNotebookAddedMock} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId("add-notebook-button"));
    fireEvent.blur(screen.getByTestId("add-notebook-input"));
    fireEvent.click(screen.getByTestId("add-notebook-button"));
    fireEvent.change(screen.getByTestId("add-notebook-input"), {
      target: { value: "my notes" },
    });
    fireEvent.submit(screen.getByTestId("add-notebook-form"));
    await waitFor(() => expect(onNotebookAddedMock).toHaveBeenCalledTimes(1));
    component.unmount();
  });
});
