/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { NotebooksPage } from "./../../src/notebooks/notebooks-page";

jest.mock("./../../src/environment.ts");

describe("Notebooks page", () => {
  it("should show list of notebooks", async () => {
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
