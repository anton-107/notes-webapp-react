/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { SingleNotebookPage } from "../../src/notebooks/single-notebook-page";

describe("Notebooks page", () => {
  beforeAll(() => {
    fetchMock.mockResponse(async (req) => {
      if (req.url.endsWith("/note")) {
        return JSON.stringify({
          notes: [
            {
              content: "Note 1",
              id: "note-1",
            },
            {
              content: "Note 2",
              id: "note-2",
            },
            {
              content: "To do",
              id: "todo-section",
              type: { type: "notes-container" },
            },
            {
              content: "To do item one",
              id: "todo-1",
              extensionProperties: { section: "todo-section" },
            },
          ],
        });
      } else {
        return JSON.stringify({
          name: "Notebook 1",
          id: "notebook-1",
        });
      }
    });
  });
  it("should show notebooks page header", async () => {
    const component = render(
      <BrowserRouter>
        <SingleNotebookPage />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-name-header"));
    expect(screen.getByTestId("notebook-name-header")).toHaveTextContent(
      "Notebook 1"
    );
    component.unmount();
  });
  it("should highlight overview link", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <SingleNotebookPage />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-overview-link"));
    expect(screen.getByTestId("notebook-overview-link")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
  it("should highlight list link", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/list"]}>
        <SingleNotebookPage />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-list-link"));
    expect(screen.getByTestId("notebook-list-link")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
  it("should highlight board link", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/board"]}>
        <SingleNotebookPage />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByTestId("notebook-board-link"));
    expect(screen.getByTestId("notebook-board-link")).toHaveClass(
      "active-nav-link"
    );
    component.unmount();
  });
  it("should delete a notebook", async () => {
    const component = render(
      <MemoryRouter initialEntries={["/"]}>
        <SingleNotebookPage />
      </MemoryRouter>
    );
    await waitFor(() =>
      screen.getByTestId("notebook-more-actions-menu-button")
    );
    fireEvent.click(screen.getByTestId("notebook-more-actions-menu-button"));
    expect(
      screen.getByTestId("notebook-more-actions-dropdown-menu")
    ).toHaveClass("open");
    fireEvent.click(screen.getByTestId("action-delete-notebook-notebook-1"));
    component.unmount();
  });
});
