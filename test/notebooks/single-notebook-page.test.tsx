/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SingleNotebookPage } from "../../src/notebooks/single-notebook-page";

describe("Notebooks page", () => {
  it("should show notebooks page header", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        name: "Notebook 1",
        id: "notebook-1",
      })
    );

    const component = render(
      <BrowserRouter>
        <SingleNotebookPage />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByRole("heading"));
    expect(screen.getByRole("heading")).toHaveTextContent("Notebook 1");
    component.unmount();
  });
});
