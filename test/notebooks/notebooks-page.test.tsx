/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { NotebooksPage } from "./../../src/notebooks/notebooks-page";
import { BrowserRouter } from "react-router-dom";

describe("Notebooks page", () => {
  it("should show notebooks page header", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        notebooks: [
          { name: "Notebook 1", id: "notebook-1" },
          { name: "Notebook 2", id: "notebook-2" },
        ],
      })
    );

    const component = render(
      <BrowserRouter>
        <NotebooksPage />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Notebooks");
    await waitFor(() => screen.getByTestId("notebook-notebook-1"));
    expect(screen.getByTestId("notebook-notebook-1")).toHaveTextContent(
      "Notebook 1"
    );
    expect(screen.getByTestId("notebook-notebook-2")).toHaveTextContent(
      "Notebook 2"
    );
    component.unmount();
  });
});
