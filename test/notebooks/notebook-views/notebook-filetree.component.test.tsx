/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import * as React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

import { NotebookFileTreeComponent } from "../../../src/notebooks/notebook-views/notebook-filetree.component";

describe("Notebook file tree component", () => {
  describe("In a notebook with no columns", () => {
    beforeAll(() => {
      fetchMock.mockResponse(async (req) => {
        if (req.url.endsWith("/note")) {
          return JSON.stringify({
            notes: [
              {
                content: "/src/file-1",
                id: "note-1",
                extensionProperties: { manualOrder: 100, numberOfLines: 10 },
              },
              {
                content: "/src/file-2",
                id: "note-2",
                extensionProperties: { manualOrder: 200, numberOfLines: 10 },
              },
              {
                content: "/config-file",
                id: "note-3",
                extensionProperties: { manualOrder: 300, numberOfLines: 10 },
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

    afterAll(() => {
      fetchMock.resetMocks();
    });

    it("should show a file", async () => {
      const component = render(
        <BrowserRouter>
          <NotebookFileTreeComponent />
        </BrowserRouter>
      );
      await waitFor(() => screen.getByTestId("file-config-file"));
      expect(screen.getByTestId("file-config-file")).toHaveTextContent(
        "config-file"
      );
      component.unmount();
    });

    it("should show a 'level up' button", async () => {
      const component = render(
        <MemoryRouter
          initialEntries={["/notebook/notebook-1/file-tree?currentPath=/src"]}
        >
          <Routes>
            <Route
              path="/notebook/:notebookID/file-tree"
              element={<NotebookFileTreeComponent />}
            />
          </Routes>
        </MemoryRouter>
      );
      await waitFor(() => screen.getByTestId("filetree-level-up-link"));
      expect(screen.getByTestId("filetree-level-up-link")).toHaveTextContent(
        ".."
      );
      expect(screen.getByTestId("filetree-level-up-link")).toHaveAttribute(
        "href",
        "/notebook/notebook-1/file-tree?currentPath="
      );
      component.unmount();
    });
  });

  describe("In a notebook with a column", () => {
    beforeAll(() => {
      fetchMock.mockResponse(async (req) => {
        if (req.url.endsWith("/note")) {
          return JSON.stringify({
            notes: [
              {
                content: "/src/file-1",
                id: "note-1",
                extensionProperties: { manualOrder: 100 },
              },
              {
                content: "/src/file-2",
                id: "note-2",
                extensionProperties: { manualOrder: 200 },
              },
              {
                content: "/config-file",
                id: "note-3",
                extensionProperties: {
                  manualOrder: 300,
                  numberOfChanges: 8,
                  numberOfLines: 10,
                },
              },
            ],
          });
        } else {
          return JSON.stringify({
            name: "Notebook 1",
            id: "notebook-1",
            tableColumns: [
              {
                name: "Number of changes",
                columnType: "numberOfChanges",
                valueType: "number",
                valueSource: "extensionProperties",
              },
            ],
          });
        }
      });
    });

    afterAll(() => {
      fetchMock.resetMocks();
    });

    it("should show a file with number of changes", async () => {
      const component = render(
        <BrowserRouter>
          <NotebookFileTreeComponent />
        </BrowserRouter>
      );
      await waitFor(() => screen.getByTestId("file-config-file"));
      expect(screen.getByTestId("file-config-file")).toHaveTextContent(
        "config-file"
      );
      expect(
        screen.getByTestId(
          "file-column-displayed-value-config-file-numberOfChanges"
        )
      ).toHaveTextContent("8");
      component.unmount();
    });
  });
});
