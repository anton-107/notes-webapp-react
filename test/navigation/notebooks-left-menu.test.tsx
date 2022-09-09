/**
 * @jest-environment jsdom
 */
import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotebooksLeftMenu } from "../../src/navigation/notebooks-left-menu";

describe("Notebooks page", () => {
  it("should show list of notebooks and highlight an active notebook", async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        notebooks: [
          { name: "Notebook 1", id: "notebook-1" },
          { name: "Notebook 2", id: "notebook-2" },
        ],
      })
    );

    const component = render(
      <MemoryRouter initialEntries={["/notebook/notebook-2"]}>
        <NotebooksLeftMenu />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-notebook-1"));
    expect(screen.getByTestId("notebook-notebook-1")).toHaveTextContent(
      "Notebook 1"
    );
    expect(screen.getByTestId("notebook-notebook-2")).toHaveTextContent(
      "Notebook 2"
    );
    expect(screen.getByTestId("notebook-notebook-1")).not.toHaveClass(
      "active-nav-link"
    );
    expect(screen.getByTestId("notebook-notebook-2")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
});
